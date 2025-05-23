# Generated by Django 5.1.6 on 2025-04-24 21:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_initial'),
        ('products', '0003_productvariantoption_productvarianttype_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='product_dimensions',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product_weight',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='variant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.productvariant'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='variant_details',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
