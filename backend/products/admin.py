from django.contrib import admin
from .models import Category, Product, ProductImage, Review, ProductView

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    readonly_fields = ['user', 'rating', 'comment', 'created_at']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'discount_price', 'stock', 'category', 'seller', 'created_at']
    list_filter = ['category', 'seller', 'created_at']
    search_fields = ['name', 'description']
    inlines = [ProductImageInline, ReviewInline]
    
    def get_queryset(self, request):
        # Optimize queries with select_related
        return super().get_queryset(request).select_related('category', 'seller')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'creator', 'created_at']
    list_filter = ['parent', 'creator', 'created_at']
    search_fields = ['name', 'description']
    
    def get_queryset(self, request):
        # Optimize queries with select_related
        return super().get_queryset(request).select_related('parent', 'creator')

class ProductViewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'session_id', 'timestamp']
    list_filter = ['product', 'timestamp']
    readonly_fields = ['product', 'user', 'session_id', 'timestamp']
    
    def get_queryset(self, request):
        # Optimize queries with select_related
        return super().get_queryset(request).select_related('product', 'user')

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user', 'rating', 'created_at']
    list_filter = ['product', 'rating', 'created_at']
    readonly_fields = ['created_at']
    
    def get_queryset(self, request):
        # Optimize queries with select_related
        return super().get_queryset(request).select_related('product', 'user')

admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
admin.site.register(Review, ReviewAdmin)
admin.site.register(ProductView, ProductViewAdmin)