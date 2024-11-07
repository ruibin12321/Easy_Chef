# Generated by Django 4.0.1 on 2023-03-10 02:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShoppingList',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('ingredients', models.ManyToManyField(blank=True, to='recipes.IngredientQuantity')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='shoppinglist', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]