from django.urls import path
from .views import ProductViewSet, CategoryViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Define URL patterns explicitly
urlpatterns = [

    # Product routes
    path('', ProductViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='product-list'),
    
    path('<int:pk>/', ProductViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='product-detail'),
    
    # Seller-specific product routes
    path('my-products/', ProductViewSet.as_view({
        'get': 'my_products'
    }), name='my-products'),
    
    path('my-images/', ProductViewSet.as_view({
        'get': 'my_images'
    }), name='my-images'),
    
    path('all-images/', ProductViewSet.as_view({
        'get': 'all_images'
    }), name='all-images'),
    
    # Category routes
    path('categories/', CategoryViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='category-list'),
    
    path('categories/<int:pk>/', CategoryViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='category-detail'),
    
    # Seller-specific category routes
    path('categories/my-categories/', CategoryViewSet.as_view({
        'get': 'my_categories'
    }), name='my-categories'),
    
    # Category custom actions
    path('categories/<int:pk>/subcategories/', CategoryViewSet.as_view({
        'get': 'subcategories'
    }), name='category-subcategories'),
    
    path('categories/<int:pk>/products/', CategoryViewSet.as_view({
        'get': 'products'
    }), name='category-products'),
    
    # Product custom actions
    path('<int:pk>/add-review/', ProductViewSet.as_view({
        'post': 'add_review'
    }), name='product-add-review'),
    
    path('<int:pk>/upload-files/', ProductViewSet.as_view({
        'post': 'upload_files'
    }), name='product-upload-files'),
]