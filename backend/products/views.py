import uuid

from rest_framework import viewsets, status
from rest_framework.decorators import action, parser_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample, OpenApiResponse
from drf_spectacular.types import OpenApiTypes
from django.db import transaction, connection
from django.db.models import Q

from .models import Product, ProductView, Review, ProductImage, Category
from .serializers import ProductSerializer, ProductCreateUpdateSerializer, ReviewSerializer, ProductImageSerializer, CategorySerializer
from permissions import IsSellerOrAdmin, IsProductSeller


class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing category instances.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [JSONParser, MultiPartParser, FormParser]  # Add parsers to handle file uploads
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsSellerOrAdmin()]
        elif self.action in ['my_categories']:
            return [IsAuthenticated()]
        return super().get_permissions()
    
    def get_queryset(self):
        # Optimize queries with select_related
        return Category.objects.select_related('parent', 'creator')
    
    @extend_schema(
        description="List all categories",
        responses={200: CategorySerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """
        Get all categories in the store
        """
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            # Simplified error handling
            categories = self.get_queryset()
            simplified_categories = []
            
            for category in categories:
                try:
                    simplified_categories.append({
                        'id': category.id,
                        'name': category.name,
                        'description': category.description,
                        'parent': category.parent.id if category.parent else None,
                        'creator': category.creator.id if category.creator else None,
                        'creator_username': category.creator.username if category.creator else None,
                        'created_at': getattr(category, 'created_at', None),
                        'updated_at': getattr(category, 'updated_at', None),
                        'image': None
                    })
                except Exception:
                    continue
            
            return Response(simplified_categories)
    
    @extend_schema(
        description="Create a new category",
        request=CategorySerializer,
        responses={201: CategorySerializer}
    )
    def create(self, request, *args, **kwargs):
        """
        Create a new category
        """
        # Handle parent field if it's 0 or empty string
        data = request.data.copy()
        if 'parent' in data and (data['parent'] == '0' or data['parent'] == 0 or data['parent'] == ''):
            data.pop('parent')
        
        # Handle image field if it's a string instead of a file
        if 'image' in data and isinstance(data['image'], str) and data['image'] != '':
            # If it's just a placeholder string, remove it
            if data['image'] == 'string' or not data['image'].startswith(('http://', 'https://')):
                data.pop('image')
        
        # Set the creator to the current user
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(creator=request.user)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @extend_schema(
        description="Retrieve a specific category by ID",
        responses={200: CategorySerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        try:
            return super().retrieve(request, *args, **kwargs)
        except Exception as e:
            # Simplified error handling
            category = self.get_object()
            simplified_category = {
                'id': category.id,
                'name': category.name,
                'description': category.description,
                'parent': category.parent.id if category.parent else None,
                'creator': category.creator.id if category.creator else None,
                'creator_username': category.creator.username if category.creator else None,
                'created_at': getattr(category, 'created_at', None),
                'updated_at': getattr(category, 'updated_at', None),
                'image': None
            }
            return Response(simplified_category)
    
    @extend_schema(
        description="Update a category (full update)",
        request=CategorySerializer,
        responses={200: CategorySerializer}
    )
    def update(self, request, *args, **kwargs):
        # Handle parent field if it's 0 or empty string
        data = request.data.copy()
        if 'parent' in data and (data['parent'] == '0' or data['parent'] == 0 or data['parent'] == ''):
            data.pop('parent')
        
        # Handle image field if it's a string instead of a file
        if 'image' in data and isinstance(data['image'], str) and data['image'] != '':
            # If it's just a placeholder string, remove it
            if data['image'] == 'string' or not data['image'].startswith(('http://', 'https://')):
                data.pop('image')
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)
    
    @extend_schema(
        description="Update a category (partial update)",
        request=CategorySerializer,
        responses={200: CategorySerializer}
    )
    def partial_update(self, request, *args, **kwargs):
        # Handle parent field if it's 0 or empty string
        data = request.data.copy()
        if 'parent' in data and (data['parent'] == '0' or data['parent'] == 0 or data['parent'] == ''):
            data.pop('parent')
        
        # Handle image field if it's a string instead of a file
        if 'image' in data and isinstance(data['image'], str) and data['image'] != '':
            # If it's just a placeholder string, remove it
            if data['image'] == 'string' or not data['image'].startswith(('http://', 'https://')):
                data.pop('image')
        
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Check if user is the creator or admin
        if instance.creator and instance.creator != request.user and not request.user.is_staff and request.user.role != 'admin':
            return Response(
                {'error': 'Only the creator or admin can delete this category'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if category has products
        if instance.products.exists():
            return Response(
                {'error': 'Cannot delete category that has products. Reassign products to another category first.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Use Django ORM to delete the category
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {'error': f'Failed to delete category: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @extend_schema(
        description="Get categories created by the authenticated seller",
        responses={200: CategorySerializer(many=True)}
    )
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_categories(self, request):
        """
        Get categories created by the authenticated seller
        """
        user = request.user
        # Check if user is a seller or admin
        if not (user.role == 'seller' or user.role == 'admin' or user.is_staff):
            return Response(
                {'error': 'Only sellers and admins can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get categories created by the current user
        categories = Category.objects.filter(creator=user)
        
        try:
            # Paginate results
            page = self.paginate_queryset(categories)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            
            serializer = self.get_serializer(categories, many=True)
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            simplified_categories = []
            
            for category in categories:
                try:
                    simplified_categories.append({
                        'id': category.id,
                        'name': category.name,
                        'description': category.description,
                        'parent': category.parent.id if category.parent else None,
                        'creator': category.creator.id if category.creator else None,
                        'creator_username': category.creator.username if category.creator else None,
                        'created_at': getattr(category, 'created_at', None),
                        'updated_at': getattr(category, 'updated_at', None),
                        'image': None
                    })
                except Exception:
                    continue
            
            return Response(simplified_categories)
    
    @extend_schema(
        description="Get all subcategories for a specific category",
        responses={200: CategorySerializer(many=True)}
    )
    @action(detail=True, methods=['get'])
    def subcategories(self, request, pk=None):
        """
        Get all subcategories for a specific category
        """
        category = self.get_object()
        subcategories = Category.objects.filter(parent=category)
        
        try:
            serializer = self.get_serializer(subcategories, many=True)
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            simplified_subcategories = []
            
            for subcategory in subcategories:
                try:
                    simplified_subcategories.append({
                        'id': subcategory.id,
                        'name': subcategory.name,
                        'description': subcategory.description,
                        'parent': subcategory.parent.id if subcategory.parent else None,
                        'creator': subcategory.creator.id if subcategory.creator else None,
                        'creator_username': subcategory.creator.username if subcategory.creator else None,
                        'created_at': getattr(subcategory, 'created_at', None),
                        'updated_at': getattr(subcategory, 'updated_at', None),
                        'image': None
                    })
                except Exception:
                    continue
            
            return Response(simplified_subcategories)
    
    @extend_schema(
        description="Get all products in a specific category",
        responses={200: ProductSerializer(many=True)}
    )
    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        """
        Get all products in a specific category
        """
        category = self.get_object()
        products = category.products.all().select_related('category', 'seller')
        
        try:
            serializer = ProductSerializer(products, many=True, context={'request': request})
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            simplified_products = []
            
            for product in products:
                try:
                    simplified_products.append({
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'price': str(product.price),
                        'discount_price': str(product.discount_price) if product.discount_price else None,
                        'stock': product.stock,
                        'category': product.category.id if product.category else None,
                        'category_name': product.category.name if product.category else None,
                        'seller': product.seller.id if product.seller else None,
                        'seller_username': product.seller.username if product.seller else None,
                        'created_at': product.created_at,
                        'updated_at': product.updated_at,
                    })
                except Exception:
                    continue
            
            return Response(simplified_products)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductCreateUpdateSerializer
        return ProductSerializer
    
    def get_queryset(self):
        # Optimize queries with select_related
        return Product.objects.select_related('category', 'seller')
    
    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            # Allow anyone to view products
            return []
        elif self.action == 'create':
            return [IsAuthenticated(), IsSellerOrAdmin()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsProductSeller()]
        elif self.action in ['my_products', 'my_images']:
            return [IsAuthenticated()]
        return [IsAuthenticatedOrReadOnly()]
    
    @extend_schema(
        description="List all products in the store - accessible to anyone",
        responses={200: ProductSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """
        Get all products in the store. This endpoint is accessible to anyone.
        """
        try:
            return super().list(request, *args, **kwargs)
        except Exception as e:
            # Simplified error handling
            products = self.get_queryset()
            simplified_products = []
            
            for product in products:
                try:
                    simplified_products.append({
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'price': str(product.price),
                        'discount_price': str(product.discount_price) if product.discount_price else None,
                        'stock': product.stock,
                        'category': product.category.id if product.category else None,
                        'category_name': product.category.name if product.category else None,
                        'seller': product.seller.id if product.seller else None,
                        'seller_username': product.seller.username if product.seller else None,
                        'created_at': product.created_at,
                        'updated_at': product.updated_at,
                    })
                except Exception:
                    continue
            
            return Response(simplified_products)
    
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            # Track view - simplified
            try:
                # Check if ProductView model exists in the database
                with connection.cursor() as cursor:
                    cursor.execute("""
                        SELECT EXISTS (
                            SELECT FROM information_schema.tables 
                            WHERE table_name = 'products_productview'
                        );
                    """)
                    table_exists = cursor.fetchone()[0]
                
                if table_exists:
                    if request.user.is_authenticated:
                        ProductView.objects.create(product=instance, user=request.user)
                    else:
                        session_id = request.session.get('session_id')
                        if not session_id:
                            session_id = str(uuid.uuid4())
                            request.session['session_id'] = session_id
                        ProductView.objects.create(product=instance, session_id=session_id)
            except Exception:
                # Don't let view tracking failure affect the API response
                pass
            
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            instance = self.get_object()
            simplified_product = {
                'id': instance.id,
                'name': instance.name,
                'description': instance.description,
                'price': str(instance.price),
                'discount_price': str(instance.discount_price) if instance.discount_price else None,
                'stock': instance.stock,
                'category': instance.category.id if instance.category else None,
                'category_name': instance.category.name if instance.category else None,
                'seller': instance.seller.id if instance.seller else None,
                'seller_username': instance.seller.username if instance.seller else None,
                'created_at': instance.created_at,
                'updated_at': instance.updated_at,
            }
            return Response(simplified_product)
    
    @extend_schema(
        description="Get products for the authenticated seller",
        responses={200: ProductSerializer(many=True)}
    )
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_products(self, request):
        """
        Get products for the authenticated seller
        """
        user = request.user
        
        # Check if user is a seller or admin
        if not (user.role == 'seller' or user.role == 'admin' or user.is_staff):
            return Response(
                {'error': 'Only sellers and admins can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get products for the current user
        products = Product.objects.filter(seller=user).select_related('category')
        
        try:
            # Paginate results
            page = self.paginate_queryset(products)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            
            serializer = self.get_serializer(products, many=True)
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            simplified_products = []
            
            for product in products:
                try:
                    simplified_products.append({
                        'id': product.id,
                        'name': product.name,
                        'description': product.description,
                        'price': str(product.price),
                        'discount_price': str(product.discount_price) if product.discount_price else None,
                        'stock': product.stock,
                        'category': product.category.id if product.category else None,
                        'category_name': product.category.name if product.category else None,
                        'seller': product.seller.id if product.seller else None,
                        'seller_username': product.seller.username if product.seller else None,
                        'created_at': product.created_at,
                        'updated_at': product.updated_at,
                    })
                except Exception:
                    continue
            
            return Response(simplified_products)
    
    @extend_schema(
        description="Get all images uploaded by the authenticated seller",
        responses={200: ProductImageSerializer(many=True)}
    )
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_images(self, request):
        """
        Get all images uploaded by the authenticated seller
        """
        user = request.user
        
        # Check if user is a seller or admin
        if not (user.role == 'seller' or user.role == 'admin' or user.is_staff):
            return Response(
                {'error': 'Only sellers and admins can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get products for the current user
        products = Product.objects.filter(seller=user)
        
        # Get all images for these products
        images = ProductImage.objects.filter(product__in=products)
        
        try:
            # Paginate results
            page = self.paginate_queryset(images)
            if page is not None:
                serializer = ProductImageSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            
            serializer = ProductImageSerializer(images, many=True, context={'request': request})
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            simplified_images = []
            
            for image in images:
                try:
                    simplified_images.append({
                        'id': image.id,
                        'product': image.product.id,
                        'file': request.build_absolute_uri(image.file.url) if image.file else None,
                        'file_type': image.file_type,
                        'created_at': image.created_at,
                    })
                except Exception:
                    continue
            
            return Response(simplified_images)
    
    @extend_schema(
        description="Get all images in the store",
        responses={200: ProductImageSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def all_images(self, request):
        """
        Get all images in the store
        """
        # Get all images
        images = ProductImage.objects.all().select_related('product')
        
        try:
            # Paginate results
            page = self.paginate_queryset(images)
            if page is not None:
                serializer = ProductImageSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            
            serializer = ProductImageSerializer(images, many=True, context={'request': request})
            return Response(serializer.data)
        except Exception as e:
            # Simplified error handling
            simplified_images = []
            
            for image in images:
                try:
                    simplified_images.append({
                        'id': image.id,
                        'product': image.product.id,
                        'file': request.build_absolute_uri(image.file.url) if image.file else None,
                        'file_type': image.file_type,
                        'created_at': image.created_at,
                    })
                except Exception:
                    continue
            
            return Response(simplified_images)
    
    @extend_schema(
        request={
            'multipart/form-data': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'},
                    'discount_price': {'type': 'number', 'nullable': True},
                    'stock': {'type': 'integer'},
                    'category': {'type': 'integer'},
                    'files': {
                        'type': 'array',
                        'items': {'type': 'string', 'format': 'binary'}
                    },
                },
                'required': ['name', 'description', 'price', 'stock', 'category']
            }
        },
        parameters=[
            OpenApiParameter(
                name='files',
                type=OpenApiTypes.BINARY,
                location='form',
                description='Product images or 3D models (max 8)',
                many=True,
                required=False,
            ),
        ],
    )
    def create(self, request, *args, **kwargs):
        # Handle regular fields with serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        
        # Handle file uploads separately
        files = request.FILES.getlist('files')
        if files:
            for file in files:
                # Check if product already has 8 files
                if product.images.count() >= 8:
                    break
                    
                # Check file extension
                import os
                ext = os.path.splitext(file.name)[1].lower()
                allowed_extensions = ['.jpg', '.jpeg', '.png', '.glb', '.gltf']
                
                if ext not in allowed_extensions:
                    continue
                
                # Determine file type
                file_type = 'image' if ext in ['.jpg', '.jpeg', '.png'] else 'model'
                
                ProductImage.objects.create(
                    product=product, 
                    file=file,
                    file_type=file_type
                )
        try:
            # Return the full product data
            return Response(
                ProductSerializer(product, context={'request': request}).data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            # Simplified error handling
            simplified_product = {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': str(product.price),
                'discount_price': str(product.discount_price) if product.discount_price else None,
                'stock': product.stock,
                'category': product.category.id if product.category else None,
                'category_name': product.category.name if product.category else None,
                'seller': product.seller.id if product.seller else None,
                'seller_username': product.seller.username if product.seller else None,
                'created_at': product.created_at,
                'updated_at': product.updated_at,
            }
            return Response(simplified_product, status=status.HTTP_201_CREATED)
    
    @extend_schema(
        request={
            'multipart/form-data': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'},
                    'discount_price': {'type': 'number', 'nullable': True},
                    'stock': {'type': 'integer'},
                    'category': {'type': 'integer'},
                    'files': {
                        'type': 'array',
                        'items': {'type': 'string', 'format': 'binary'}
                    },
                }
            }
        },
        parameters=[
            OpenApiParameter(
                name='files',
                type=OpenApiTypes.BINARY,
                location='form',
                description='Product images or 3D models (max 8)',
                many=True,
                required=False,
            ),
        ],
    )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        
        # Handle file uploads separately
        files = request.FILES.getlist('files')
        if files:
            for file in files:
                # Check if product already has 8 files
                if product.images.count() >= 8:
                    break
                    
                # Check file extension
                import os
                ext = os.path.splitext(file.name)[1].lower()
                allowed_extensions = ['.jpg', '.jpeg', '.png', '.glb', '.gltf']
                
                if ext not in allowed_extensions:
                    continue
                
                # Determine file type
                file_type = 'image' if ext in ['.jpg', '.jpeg', '.png'] else 'model'
                
                ProductImage.objects.create(
                    product=product, 
                    file=file,
                    file_type=file_type
                )
        
        try:
            # Return the full product data
            return Response(
                ProductSerializer(product, context={'request': request}).data
            )
        except Exception as e:
            # Simplified error handling
            simplified_product = {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': str(product.price),
                'discount_price': str(product.discount_price) if product.discount_price else None,
                'stock': product.stock,
                'category': product.category.id if product.category else None,
                'category_name': product.category.name if product.category else None,
                'seller': product.seller.id if product.seller else None,
                'seller_username': product.seller.username if product.seller else None,
                'created_at': product.created_at,
                'updated_at': product.updated_at,
            }
            return Response(simplified_product)
    
    @extend_schema(
        request={
            'multipart/form-data': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'description': {'type': 'string'},
                    'price': {'type': 'number'},
                    'discount_price': {'type': 'number', 'nullable': True},
                    'stock': {'type': 'integer'},
                    'category': {'type': 'integer'},
                    'files': {
                        'type': 'array',
                        'items': {'type': 'string', 'format': 'binary'}
                    },
                }
            }
        },
        parameters=[
            OpenApiParameter(
                name='files',
                type=OpenApiTypes.BINARY,
                location='form',
                description='Product images or 3D models (max 8)',
                many=True,
                required=False,
            ),
        ],
    )
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
         
        # Check if user is the seller
        if instance.seller != request.user and not request.user.is_staff and request.user.role != 'admin':
            return Response(
                {'error': 'Only the seller or admin can delete this product'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            # Use a direct SQL approach to delete the product
            # This avoids ORM cascading which might try to access non-existent tables
            with connection.cursor() as cursor:
                # Get the product ID for use in queries
                product_id = instance.id
                
                # List of tables to check and clean up before deleting the product
                # We'll only delete from tables that actually exist
                tables_to_check = [
                    # Format: (table_name, column_name)
                    ('products_productview', 'product_id'),
                    ('products_review', 'product_id'),
                    ('products_productimage', 'product_id'),
                    ('carts_cartitem', 'product_id'),
                    ('orders_orderitem', 'product_id'),
                    # Add any other tables that might reference products
                ]
                
                # Check each table and delete related records if the table exists
                for table_name, column_name in tables_to_check:
                    try:
                        # Check if the table exists
                        cursor.execute(f"""
                            SELECT EXISTS (
                                SELECT FROM information_schema.tables 
                                WHERE table_name = %s
                            );
                        """, [table_name])
                        table_exists = cursor.fetchone()[0]
                        
                        if table_exists:
                            # Check if the column exists in the table
                            cursor.execute(f"""
                                SELECT EXISTS (
                                    SELECT FROM information_schema.columns 
                                    WHERE table_name = %s AND column_name = %s
                                );
                            """, [table_name, column_name])
                            column_exists = cursor.fetchone()[0]
                            
                            if column_exists:
                                # Delete records where the product is referenced
                                cursor.execute(f"""
                                    DELETE FROM "{table_name}" 
                                    WHERE "{column_name}" = %s
                                """, [product_id])
                    except Exception as e:
                        # Log the error but continue with other tables
                        print(f"Error handling {table_name}: {str(e)}")
                
                # Finally, delete the product
                cursor.execute('DELETE FROM "products_product" WHERE "id" = %s', [product_id])
                
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {'error': f'Failed to delete product: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_review(self, request, pk=None):
        product = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        
        if serializer.is_valid():
            # Check if user already reviewed this product
            existing_review = Review.objects.filter(user=request.user, product=product).first()
            if existing_review:
                return Response(
                    {'error': 'You have already reviewed this product'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer.save(user=request.user, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        request={
            'multipart/form-data': {
                'type': 'object',
                'properties': {
                    'files': {
                        'type': 'array',
                        'items': {'type': 'string', 'format': 'binary'}
                    },
                },
                'required': ['files']
            }
        },
        parameters=[
            OpenApiParameter(
                name='files',
                type=OpenApiTypes.BINARY,
                location='form',
                description='Product images or 3D models (max 8)',
                many=True,
                required=True,
            ),
        ],
    )
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsProductSeller], parser_classes=[MultiPartParser, FormParser])
    def upload_files(self, request, pk=None):
        product = self.get_object()
        
        # Check if user is the seller
        if product.seller != request.user and not request.user.is_staff and request.user.role != 'admin':
            return Response(
                {'error': 'Only the seller or admin can upload files for this product'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        files = request.FILES.getlist('files')
        if not files:
            return Response(
                {'error': 'No files provided'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if adding these files would exceed the limit
        current_count = product.images.count()
        if current_count + len(files) > 8:
            return Response(
                {'error': f'A product can have at most 8 files. You already have {current_count} files.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Process each file
        created_files = []
        for file in files:
            # Validate file extension
            import os
            ext = os.path.splitext(file.name)[1].lower()
            allowed_extensions = ['.jpg', '.jpeg', '.png', '.glb', '.gltf']
            
            if ext not in allowed_extensions:
                return Response(
                    {'error': f'File {file.name} is not a valid format. Only JPG, PNG, GLB, and GLTF are allowed.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Determine file type
            file_type = 'image' if ext in ['.jpg', '.jpeg', '.png'] else 'model'
            
            # Create the file record
            product_file = ProductImage.objects.create(
                product=product, 
                file=file,
                file_type=file_type
            )
            created_files.append(ProductImageSerializer(product_file, context={'request': request}).data)
        
        return Response(created_files, status=status.HTTP_201_CREATED)