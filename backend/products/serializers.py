from rest_framework import serializers
from .models import Product, ProductImage, Review, Category

class CategorySerializer(serializers.ModelSerializer):
    creator_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent', 'image', 'created_at', 'updated_at', 'creator', 'creator_username']
        read_only_fields = ['creator', 'created_at', 'updated_at']
    
    def get_creator_username(self, obj):
        if obj.creator:
            return obj.creator.username
        return None
    
    def to_representation(self, instance):
        try:
            return super().to_representation(instance)
        except Exception:
            # Simplified fallback representation
            return {
                'id': instance.id,
                'name': instance.name,
                'description': instance.description,
                'parent': instance.parent.id if instance.parent else None,
                'creator': instance.creator.id if instance.creator else None,
                'creator_username': self.get_creator_username(instance),
                'created_at': getattr(instance, 'created_at', None),
                'updated_at': getattr(instance, 'updated_at', None),
                'image': None
            }

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'file', 'file_type', 'created_at']
        read_only_fields = ['created_at']

class ReviewSerializer(serializers.ModelSerializer):
    user_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'user_username', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']
    
    def get_user_username(self, obj):
        try:
            return obj.user.username
        except:
            return None

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    seller_username = serializers.SerializerMethodField()
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price', 'stock',
            'category', 'category_name', 'seller', 'seller_username',
            'created_at', 'updated_at', 'images', 'reviews', 'average_rating'
        ]
        read_only_fields = ['seller', 'created_at', 'updated_at']
    
    def get_category_name(self, obj):
        try:
            return obj.category.name if obj.category else None
        except Exception:
            return None
    
    def get_seller_username(self, obj):
        try:
            return obj.seller.username if obj.seller else None
        except Exception:
            return None
    
    def get_average_rating(self, obj):
        try:
            return obj.average_rating
        except Exception:
            return None
    
    def to_representation(self, instance):
        try:
            return super().to_representation(instance)
        except Exception:
            # Simplified fallback representation
            return self.get_simplified_representation(instance)
    
    def get_simplified_representation(self, instance):
        """Helper method to create a simplified product representation"""
        return {
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

class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'discount_price', 'stock',
            'category', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        # Set the seller to the current user
        validated_data['seller'] = self.context['request'].user
        return super().create(validated_data)