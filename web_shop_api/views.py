from rest_framework import viewsets
from web_shop_api.models import Car, CarMaker, Purchase
from django.contrib.auth.models import User
from web_shop_api.serializers import UserSerializer, CarMakerSerializer, CarSerializer, PurchaseSerializer
from rest_framework import permissions, filters
from web_shop_api.permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('username',)


class CarMakerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides 'list()' and 'detail()' actions.
    """
    queryset = CarMaker.objects.all()
    serializer_class = CarMakerSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('manufacturer',)


class CarViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides 'list()', 'retrieve()', 'create()', 'update()', and 'destroy()'
    """
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('maker', 'model', 'location')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PurchaseViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list()` and `detail()` actions to all users
    and 'create()', 'update()', and 'destroy()' for admin users.
    """
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsAdminOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
