# Generated by Django 4.2 on 2023-04-06 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_customuser_skill_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='avatar',
            field=models.CharField(default='https://q.utoronto.ca/courses/291539/files/24063963/preview', max_length=999),
        ),
    ]
