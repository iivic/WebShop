from __future__ import unicode_literals
from django.db import models
import datetime

FUEL_CHOICES = (('Petrol', 'Petrol'), ('Diesel', 'Diesel'), ('Electric', 'Electric'),
                ('Ethanol (FFV, E85 etc.)', 'Ethanol (FFV, E85 etc.)'),('Hybrid', 'Hybrid'),
                ('Natural Gas', 'Natural Gas'), ('Hydrogen', 'Hydrogen'), ('Other', 'Other'),)

YEAR_CHOICES_LIST = []
for year in range(1970, datetime.datetime.now().year + 1):
    YEAR_CHOICES_LIST.append((year, year))
YEAR_CHOICES = tuple(YEAR_CHOICES_LIST)

MANUFACTURER_CHOICES = (('BMW', 'Bayerische Motoren Werke'), ('Mercedes-Benz', 'Mercedes-Benz'),
                        ('VW', 'Volkswagen'))


class CarMaker(models.Model):
    manufacturer = models.CharField(max_length=20, choices=MANUFACTURER_CHOICES)

    def __str__(self):
        return "Manufacturer: " + self.manufacturer


class Car(models.Model):
    maker = models.ForeignKey(CarMaker, related_name='cars', on_delete=models.CASCADE)
    model = models.CharField(max_length=20)
    location = models.CharField(max_length=100, default='Unknown')
    fuel_type = models.CharField(choices=FUEL_CHOICES, default='Petrol', max_length=30)
    mileage = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(default=0)
    manufacturing_year = models.IntegerField(choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    available = models.BooleanField(default=True)
    discount = models.FloatField(blank=True, default=0.0)
    last_update_date = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey('auth.User', related_name='cars', on_delete=models.CASCADE)
    # TO BE DONE
    # add avatar/image

    class Meta:
        ordering = ('last_update_date',)

    def __str__(self):
        return "Model: " + self.model


class Purchase(models.Model):
    user = models.ForeignKey('auth.User', related_name='purchases', on_delete=models.CASCADE)
    car = models.ForeignKey(Car, related_name='purchases', on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
    credit_card_number = models.PositiveIntegerField(blank=True, null=True)
    price_paid = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ('purchase_date',)

    def __str__(self):
        return "Car model: " + self.car.model + " Purchased by user: " + self.user.username
