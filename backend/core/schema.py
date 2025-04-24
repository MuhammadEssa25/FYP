from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.settings import spectacular_settings
from django.apps import apps

# This class will be used by drf-spectacular to generate the security scheme
class JWTAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = 'rest_framework_simplejwt.authentication.JWTAuthentication'
    name = 'Bearer'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'JWT',
        }

def get_model_choices_path(app_label, model_name, field_name):
    """
    Helper function to get the path to a model's choices for a field.
    Returns None if the model or field doesn't exist.
    """
    try:
        model = apps.get_model(app_label, model_name)
        if hasattr(model, field_name.upper()):
            return f"{app_label}.models.{model_name}.{field_name.upper()}"
    except LookupError:
        pass
    return None

# This function will be called after apps are loaded
def setup_spectacular_settings():
    # Initialize an empty dictionary for enum name overrides
    enum_overrides = {}
    
    # Define model-field mappings for status fields and other enums
    model_field_mappings = [
        # Order app
        ('orders', 'Order', 'STATUS', 'OrderStatusEnum'),
        ('orders', 'OrderItem', 'STATUS', 'OrderItemStatusEnum'),
        
        # Product app
        ('products', 'Product', 'STATUS', 'ProductStatusEnum'),
        ('products', 'ProductVariant', 'STATUS', 'ProductVariantStatusEnum'),
        ('products', 'ProductImage', 'STATUS', 'ProductImageStatusEnum'),
        ('products', 'Review', 'STATUS', 'ReviewStatusEnum'),
        ('products', 'Wishlist', 'STATUS', 'WishlistStatusEnum'),
        
        # Payment app
        ('payments', 'Payment', 'STATUS', 'PaymentStatusEnum'),
        ('payments', 'Payment', 'PAYMENT_METHOD', 'PaymentMethodEnum'),
        
        # Shipping app
        ('shipping', 'ShippingMethod', 'STATUS', 'ShippingStatusEnum'),
        ('shipping', 'ShippingMethod', 'SHIPPING_TYPE', 'ShippingTypeEnum'),
        
        # User app
        ('users', 'CustomUser', 'ROLE', 'UserRoleEnum'),
        
        # QnA app
        ('qna', 'Question', 'STATUS', 'QuestionStatusEnum'),
        ('qna', 'Answer', 'STATUS', 'AnswerStatusEnum'),
        
        # Cart app
        ('carts', 'Cart', 'STATUS', 'CartStatusEnum'),
        ('carts', 'CartItem', 'STATUS', 'CartItemStatusEnum'),
    ]
    
    # Process each mapping
    for app_label, model_name, field_name, enum_name in model_field_mappings:
        path = get_model_choices_path(app_label, model_name, field_name)
        if path:
            enum_overrides[enum_name] = path
    
    # Add explicit mappings for any status fields that might be causing collisions
    # These will map the auto-generated names to our preferred names
    collision_mappings = {
        # Map the auto-generated names to our preferred enum names
        'StatusD23Enum': 'ProductStatusEnum',
        'StatusCf8Enum': 'OrderStatusEnum',
        # Add more mappings as needed based on warnings
    }
    
    # Add these mappings to our overrides
    for auto_name, preferred_name in collision_mappings.items():
        if preferred_name in enum_overrides:
            enum_overrides[auto_name] = enum_overrides[preferred_name]
    
    # Set the enum name overrides
    spectacular_settings.ENUM_NAME_OVERRIDES = enum_overrides
    
    # Additional spectacular settings
    spectacular_settings.COMPONENT_SPLIT_REQUEST = True
    spectacular_settings.COMPONENT_NO_READ_ONLY_REQUIRED = True
    
    # Additional settings to help with enum naming
    spectacular_settings.ENUM_ADD_EXPLICIT_BLANK_NULL_CHOICE = False
    
    # Print the enum overrides for debugging
    print("Enum name overrides:")
    for k, v in enum_overrides.items():
        print(f"  {k}: {v}")