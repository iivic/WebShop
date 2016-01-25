from rest_framework import serializers
from web_shop_api.models import CarMaker, Car, Purchase
from django.contrib.auth.models import User


class CarMakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarMaker
        fields = ('id', 'manufacturer', 'cars')


class CarSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Car
        fields = ('id', 'maker', 'model', 'owner', 'location', 'fuel_type', 'mileage', 'price', 'manufacturing_year',
                  'available', 'discount', 'last_update_date')


class PurchaseSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Purchase
        fields = ('id', 'user', 'car', 'purchase_date', 'credit_card_number', 'price_paid')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'purchases')
