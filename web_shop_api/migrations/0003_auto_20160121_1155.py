# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-21 11:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_shop_api', '0002_auto_20160121_1150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carmaker',
            name='manufacturer',
            field=models.CharField(choices=[('BMW', 'Bayerische Motoren Werke'), ('Mercedes-Benz', 'Mercedes-Benz'), ('VW', 'Volkswagen')], max_length=20),
        ),
    ]
