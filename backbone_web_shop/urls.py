from django.conf.urls import url
from backbone_web_shop import views


urlpatterns = [
    url(r'^$', views.index, name="index"),
]
