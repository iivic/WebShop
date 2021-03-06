"""WebShop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from web_shop_api import views
from backbone_web_shop.views import MyRegistrationView
from django.contrib.auth import views as auth_views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'car-maker', views.CarMakerViewSet)
router.register(r'cars', views.CarViewSet)
router.register(r'purchase', views.PurchaseViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include(router.urls)),
    url(r'^web-shop/', include('backbone_web_shop.urls', namespace='web_shop')),
    url('^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url('^logout/$', auth_views.logout, {'next_page': 'login'}, name='logout'),
    url(r'^register/$', MyRegistrationView.as_view(), name='registration_register'),
    url(r'', include('registration.backends.simple.urls')),
]
