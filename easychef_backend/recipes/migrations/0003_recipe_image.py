# Generated by Django 4.0.1 on 2023-04-05 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_shoppinglist'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
    ]
