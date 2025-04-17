from rest_framework import serializers
from .models import Cart, CartItem
from products.models import Product
from products.serializers import ProductSerializer
from shipping.models import ShippingMethod
from collections import defaultdict
from decimal import Decimal

class CartItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_details', 'quantity', 'subtotal', 'added_at']
        read_only_fields = ['added_at', 'subtotal']
    
    def validate_product(self, value):
        """Validate that the product exists and has stock"""
        if value.stock <= 0:
            raise serializers.ValidationError(f"Product '{value.name}' is out of stock")
        return value
    
    def validate_quantity(self, value):
        """Validate that the quantity is positive"""
        if value <= 0:
            raise serializers.ValidationError("Quantity must be greater than zero")
        return value
    
    def validate(self, data):
        """Validate that the requested quantity is available"""
        product = data.get('product')
        quantity = data.get('quantity', 1)
        
        # If we're updating an existing cart item, we need to check the current quantity
        if self.instance:
            if product.stock < quantity:
                raise serializers.ValidationError(f"Not enough stock. Only {product.stock} available.")
        else:
            if product.stock < quantity:
                raise serializers.ValidationError(f"Not enough stock. Only {product.stock} available.")
        
        return data

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    item_count = serializers.IntegerField(read_only=True)
    shipping_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Cart
        fields = ['id', 'customer', 'items', 'total_amount', 'item_count', 'shipping_info', 'created_at', 'updated_at']
        read_only_fields = ['customer', 'created_at', 'updated_at']
    
    def get_shipping_info(self, obj):
        """Calculate shipping information for the cart"""
        # Group cart items by seller
        seller_items = defaultdict(list)
        seller_subtotals = defaultdict(Decimal)
        
        for cart_item in obj.items.all():
            seller = cart_item.product.seller
            seller_items[seller.id].append(cart_item)
            seller_subtotals[seller.id] += Decimal(cart_item.subtotal)
        
        # Calculate shipping costs for each seller
        shipping_details = []
        total_shipping = Decimal('0.00')
        
        for seller_id, subtotal in seller_subtotals.items():
            try:
                shipping_method = ShippingMethod.objects.get(seller_id=seller_id)
                shipping_cost = shipping_method.calculate_shipping_cost(subtotal)
                
                # Get seller name
                seller_name = shipping_method.seller.username
                
                shipping_details.append({
                    'seller_id': seller_id,
                    'seller_name': seller_name,
                    'subtotal': float(subtotal),
                    'shipping_cost': float(shipping_cost),
                    'shipping_type': shipping_method.shipping_type,
                    'free_shipping_threshold': float(shipping_method.free_shipping_threshold),
                    'qualifies_for_free_shipping': subtotal >= shipping_method.free_shipping_threshold if shipping_method.free_shipping_threshold > 0 else False
                })
                
                total_shipping += Decimal(shipping_cost)
            except ShippingMethod.DoesNotExist:
                # No shipping method found, assume free shipping
                shipping_details.append({
                    'seller_id': seller_id,
                    'seller_name': 'Unknown',  # We don't have the seller object here
                    'subtotal': float(subtotal),
                    'shipping_cost': 0.00,
                    'shipping_type': 'free',
                    'free_shipping_threshold': 0.00,
                    'qualifies_for_free_shipping': True
                })
        
        return {
            'shipping_details': shipping_details,
            'total_shipping': float(total_shipping),
            'grand_total': float(obj.total_amount + total_shipping)
        }