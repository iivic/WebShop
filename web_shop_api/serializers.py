from rest_framework import serializers
from web_shop_api.models import CarMaker, Car, Purchase
from django.contrib.auth.models import User


class CarMakerSerializer(serializers.ModelSerializer):
    cars = serializers.PrimaryKeyRelatedField(many=True, queryset=Car.objects.all())

    class Meta:
        model = CarMaker
        fields = ('id', 'manufacturer', 'cars')


class CarSerializer(serializers.ModelSerializer):
    purchases = serializers.PrimaryKeyRelatedField(many=True, queryset=Purchase.objects.all())

    class Meta:
        model = Car
        fields = ('id', 'model', 'location', 'fuel_type', 'mileage', 'price', 'manufacturing_year',
                  'available', 'discount', 'last_update_date', 'purchases')


class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('id', 'user', 'car', 'purchase_date', 'credit_card_number', 'price_paid')


class UserSerializer(serializers.ModelSerializer):
    purchases = serializers.PrimaryKeyRelatedField(many=True, queryset=Purchase.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'purchases')
