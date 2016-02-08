from django.shortcuts import render
from django.template import loader
from django.contrib.auth.decorators import login_required
from registration.backends.simple.views import RegistrationView


# Create your views here.
@login_required
def index(request):
    return render(request, 'backbone_web_shop/index.html', {})


class MyRegistrationView(RegistrationView):
    def get_success_url(self, user):
        return '/web-shop/'
