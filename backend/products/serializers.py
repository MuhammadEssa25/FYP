from rest_framework import serializers
from django.db.models import Avg
from typing import Dict, Any, Optional, List, Union
from drf_spectacular.utils import extend_schema_field
from drf_spectacular.types import OpenApiTypes
from decimal import Decimal
from .models import (
    Product, ProductVariant, ProductImage, Category, Review,
    ProductVariantType, ProductVariantOption, Wishlist, WishlistItem
)

# Import the QuestionSerializer for product questions
try:
    from qna.models import Question
except ImportError:
    # If the qna app is not yet installed, create a placeholder
    Question = None


class ProductVariantOptionSerializer(serializers.ModelSerializer):
    """
    Serializer for product variant options (like "Red" for color, "Large" for size, etc.)
    """
    variant_type_name = serializers.SerializerMethodField()
    display_value = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariantOption
        fields = ['id', 'variant_type', 'variant_type_name', 'value', 'display_value']

    @extend_schema_field(OpenApiTypes.STR)
    def get_variant_type_name(self, obj) -> str:
        """
        Get the name of the variant type
        """
        return obj.variant_type.name if obj.variant_type else None
        
    @extend_schema_field(OpenApiTypes.STR)
    def get_display_value(self, obj) -> str:
        """
        Get a formatted display value for the option
        """
        return f"{obj.variant_type.name}: {obj.value}" if obj.variant_type else obj.value


class ProductVariantTypeSerializer(serializers.ModelSerializer):
    """
    Serializer for product variant types (like color, size, etc.)
    """
    options = serializers.SerializerMethodField()

    class Meta:
        model = ProductVariantType
        fields = ['id', 'name', 'options']

    @extend_schema_field({'type': 'array', 'items': {'type': 'object'}})
    def get_options(self, obj) -> List[Dict[str, Any]]:
        """
        Get options for this variant type
        """
        return ProductVariantOptionSerializer(obj.options.all(), many=True).data


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for product categories
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent', 'image']


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for product reviews
    """
    user_name = serializers.CharField(source='user.username', read_only=True)
    rating = serializers.IntegerField(min_value=1, max_value=5)

    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        # Set the user to the current user
        validated_data['user'] = self.context['request'].user
        
        # Check if the user has already reviewed this product
        existing_review = Review.objects.filter(
            product=validated_data['product'],
            user=validated_data['user']
        ).first()
        
        if existing_review:
            # Update the existing review
            for key, value in validated_data.items():
                setattr(existing_review, key, value)
            existing_review.save()
            return existing_review
        
        # Create a new review
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    """
    Base serializer for Product model
    """
    dimensions = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'))
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    stock = serializers.IntegerField(min_value=0)
    weight = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    length = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    width = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    height = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'created_at', 'updated_at', 
            'seller', 'weight', 'length', 'width', 'height', 'dimensions'
        ]

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_dimensions(self, obj) -> Dict[str, Optional[float]]:
        """
        Get dimensions as a dictionary
        """
        return {
            'length': obj.length,
            'width': obj.width,
            'height': obj.height
        } if all([obj.length, obj.width, obj.height]) else None


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating and updating products
    """
    dimensions = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'))
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    stock = serializers.IntegerField(min_value=0)
    weight = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    length = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    width = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    height = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'weight', 'length', 'width', 'height', 'dimensions'
        ]

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_dimensions(self, obj) -> Dict[str, Optional[float]]:
        """
        Get dimensions as a dictionary
        """
        return {
            'length': obj.length,
            'width': obj.width,
            'height': obj.height
        } if all([obj.length, obj.width, obj.height]) else None

    def create(self, validated_data):
        # Remove dimensions if it's in the validated data
        if 'dimensions' in validated_data:
            validated_data.pop('dimensions')
        
        user = self.context['request'].user
        return Product.objects.create(seller=user, **validated_data)

    def update(self, instance, validated_data):
        # Remove dimensions if it's in the validated data
        if 'dimensions' in validated_data:
            validated_data.pop('dimensions')
        
        return super().update(instance, validated_data)


class ProductImageSerializer(serializers.ModelSerializer):
    """
    Serializer for product images
    """
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'file', 'file_type', 'created_at']
        read_only_fields = ['product']


class ProductVariantSerializer(serializers.ModelSerializer):
    """
    Serializer for product variants
    """
    options = ProductVariantOptionSerializer(many=True, read_only=True)
    name = serializers.SerializerMethodField()
    price_adjustment = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('-1000.00'))
    stock = serializers.IntegerField(min_value=0)
    weight = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'product', 'sku', 'price_adjustment', 
            'stock', 'weight', 'is_active', 'options', 'name'
        ]
        read_only_fields = ['product']

    @extend_schema_field(OpenApiTypes.STR)
    def get_name(self, obj) -> str:
        """
        Get a display name for the variant based on its options
        """
        options_str = ", ".join([str(option) for option in obj.options.all()])
        return f"{obj.product.name} - {options_str}" if options_str else obj.sku


class ProductListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing products
    """
    primary_image = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    category_details = serializers.SerializerMethodField()
    in_wishlist = serializers.SerializerMethodField()
    dimensions = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'), read_only=True)
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'created_at', 'category_details',
            'primary_image', 'average_rating', 'seller', 'seller_name', 'in_wishlist',
            'weight', 'length', 'width', 'height', 'dimensions'
        ]

    @extend_schema_field(OpenApiTypes.STR)
    def get_primary_image(self, obj) -> Optional[str]:
        """
        Get the primary image URL for the product
        """
        primary_image = obj.images.filter(file_type='image').first()
        if primary_image:
            return primary_image.file.url
        return None

    @extend_schema_field(OpenApiTypes.NUMBER)
    def get_average_rating(self, obj) -> Optional[float]:
        """
        Calculate the average rating for the product
        """
        avg_rating = obj.reviews.aggregate(avg=Avg('rating'))['avg']
        return round(avg_rating, 1) if avg_rating else None

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_category_details(self, obj) -> Optional[Dict[str, Any]]:
        """
        Get category details if available
        """
        if obj.category:
            return CategorySerializer(obj.category).data
        return None
            
    @extend_schema_field(OpenApiTypes.BOOL)
    def get_in_wishlist(self, obj) -> bool:
        """
        Check if the product is in the user's wishlist
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Wishlist.objects.filter(
                user=request.user,
                items__product=obj
            ).exists()
        return False

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_dimensions(self, obj) -> Dict[str, Optional[float]]:
        """
        Get dimensions as a dictionary
        """
        return {
            'length': obj.length,
            'width': obj.width,
            'height': obj.height
        } if all([obj.length, obj.width, obj.height]) else None


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for detailed product information
    """
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    questions = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    category_details = serializers.SerializerMethodField()
    variant_types = serializers.SerializerMethodField()
    in_wishlist = serializers.SerializerMethodField()
    dimensions = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'), read_only=True)
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'created_at', 'category_details',
            'updated_at', 'images', 'variants', 'variant_types', 'average_rating', 'seller',
            'seller_name', 'weight', 'length', 'width', 'height', 'dimensions', 'questions', 'reviews', 'in_wishlist'
        ]

    @extend_schema_field(OpenApiTypes.NUMBER)
    def get_average_rating(self, obj) -> Optional[float]:
        """
        Calculate the average rating for the product
        """
        avg_rating = obj.reviews.aggregate(avg=Avg('rating'))['avg']
        return round(avg_rating, 1) if avg_rating else None

    @extend_schema_field({'type': 'array', 'items': {'type': 'object'}})
    def get_questions(self, obj) -> List[Dict[str, Any]]:
        """
        Get approved questions for the product
        """
        try:
            # Import here to avoid circular imports
            from qna.serializers import QuestionSerializer
            
            # Only get approved questions
            questions = obj.questions.filter(is_approved=True)
            return QuestionSerializer(questions, many=True).data
        except (ImportError, AttributeError):
            return []

    @extend_schema_field({'type': 'array', 'items': {'type': 'object'}})
    def get_reviews(self, obj) -> List[Dict[str, Any]]:
        """
        Get reviews for the product
        """
        reviews = obj.reviews.all()
        return ReviewSerializer(reviews, many=True).data

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_category_details(self, obj) -> Optional[Dict[str, Any]]:
        """
        Get category details if available
        """
        if obj.category:
            return CategorySerializer(obj.category).data
        return None

    @extend_schema_field({'type': 'array', 'items': {'type': 'object'}})
    def get_variant_types(self, obj) -> List[Dict[str, Any]]:
        """
        Get variant types available for this product
        """
        # Get all variant types that have options used by this product's variants
        variant_types = ProductVariantType.objects.filter(
            options__variants__product=obj
        ).distinct()
        return ProductVariantTypeSerializer(variant_types, many=True).data
            
    @extend_schema_field(OpenApiTypes.BOOL)
    def get_in_wishlist(self, obj) -> bool:
        """
        Check if the product is in the user's wishlist
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Wishlist.objects.filter(
                user=request.user,
                items__product=obj
            ).exists()
        return False

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_dimensions(self, obj) -> Dict[str, Optional[float]]:
        """
        Get dimensions as a dictionary
        """
        return {
            'length': obj.length,
            'width': obj.width,
            'height': obj.height
        } if all([obj.length, obj.width, obj.height]) else None


class ProductCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating products
    """
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'))
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    stock = serializers.IntegerField(min_value=0)
    weight = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    length = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    width = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    height = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'weight', 'length', 'width', 'height'
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        return Product.objects.create(seller=user, **validated_data)


class ProductUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating products
    """
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'), required=False)
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    stock = serializers.IntegerField(min_value=0, required=False)
    weight = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    length = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    width = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)
    height = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'weight', 'length', 'width', 'height'
        ]


class ProductVariantCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating product variants
    """
    price_adjustment = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('-1000.00'))
    stock = serializers.IntegerField(min_value=0)
    weight = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True)

    class Meta:
        model = ProductVariant
        fields = [
            'sku', 'price_adjustment', 'stock', 'weight', 'is_active'
        ]

    def create(self, validated_data):
        product = self.context.get('product')
        return ProductVariant.objects.create(product=product, **validated_data)


class ProductImageCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating product images
    """
    class Meta:
        model = ProductImage
        fields = ['file', 'file_type']

    def create(self, validated_data):
        product = self.context.get('product')
        return ProductImage.objects.create(product=product, **validated_data)


class ProductSearchSerializer(serializers.ModelSerializer):
    """
    Serializer for search results
    """
    primary_image = serializers.SerializerMethodField()
    seller_name = serializers.CharField(source='seller.username', read_only=True)
    category_details = serializers.SerializerMethodField()
    in_wishlist = serializers.SerializerMethodField()
    dimensions = serializers.SerializerMethodField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.01'), read_only=True)
    discount_price = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal('0.00'), required=False, allow_null=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price',
            'stock', 'is_active', 'status', 'category_details',
            'primary_image', 'seller', 'seller_name', 'weight', 'length', 'width', 'height', 'dimensions', 'in_wishlist'
        ]

    @extend_schema_field(OpenApiTypes.STR)
    def get_primary_image(self, obj) -> Optional[str]:
        """
        Get the primary image URL for the product
        """
        primary_image = obj.images.filter(file_type='image').first()
        if primary_image:
            return primary_image.file.url
        return None

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_category_details(self, obj) -> Optional[Dict[str, Any]]:
        """
        Get category details if available
        """
        if obj.category:
            return CategorySerializer(obj.category).data
        return None
            
    @extend_schema_field(OpenApiTypes.BOOL)
    def get_in_wishlist(self, obj) -> bool:
        """
        Check if the product is in the user's wishlist
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Wishlist.objects.filter(
                user=request.user,
                items__product=obj
            ).exists()
        return False

    @extend_schema_field(OpenApiTypes.OBJECT)
    def get_dimensions(self, obj) -> Dict[str, Optional[float]]:
        """
        Get dimensions as a dictionary
        """
        return {
            'length': obj.length,
            'width': obj.width,
            'height': obj.height
        } if all([obj.length, obj.width, obj.height]) else None


# Wishlist serializers
class WishlistItemSerializer(serializers.ModelSerializer):
    """
    Serializer for wishlist items
    """
    product_details = serializers.SerializerMethodField()
    variant_details = serializers.SerializerMethodField()

    class Meta:
        model = WishlistItem
        fields = ['id', 'product', 'variant', 'added_at', 'notes', 'product_details', 'variant_details']
        read_only_fields = ['wishlist', 'added_at']

    @extend_schema_field(OpenApiTypes.OBJECT)    
    def get_product_details(self, obj) -> Dict[str, Any]:
        """
        Get detailed product information
        """
        return ProductListSerializer(obj.product, context=self.context).data

    @extend_schema_field(OpenApiTypes.OBJECT)    
    def get_variant_details(self, obj) -> Optional[Dict[str, Any]]:
        """
        Get variant details if a variant is selected
        """
        if obj.variant:
            return ProductVariantSerializer(obj.variant).data
        return None


class WishlistSerializer(serializers.ModelSerializer):
    """
    Serializer for wishlists
    """
    items = WishlistItemSerializer(many=True, read_only=True)
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'created_at', 'updated_at', 'items', 'item_count']
        read_only_fields = ['user', 'created_at', 'updated_at']

    @extend_schema_field(OpenApiTypes.INT)    
    def get_item_count(self, obj) -> int:
        """
        Get the number of items in the wishlist
        """
        return obj.items.count()