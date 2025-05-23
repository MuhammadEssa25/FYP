# Generated by Django 5.1.6 on 2025-04-24 21:32

import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0004_rename_subtotal_amount_order_total_price_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('payment_method', models.CharField(choices=[('credit_card', 'Credit Card'), ('paypal', 'PayPal'), ('bank_transfer', 'Bank Transfer')], default='credit_card', max_length=20)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed'), ('refunded', 'Refunded')], default='pending', max_length=10)),
                ('transaction_id', models.CharField(default=uuid.uuid4, max_length=100, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='orders.order')),
            ],
        ),
        migrations.CreateModel(
            name='Refund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('reason', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('transaction_id', models.CharField(default=uuid.uuid4, max_length=100, unique=True)),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='refunds', to='payments.payment')),
                ('processed_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
