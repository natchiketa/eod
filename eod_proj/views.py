# Create your views here.
import json

from django.http import HttpResponse

def foo(request):
    try:
        args = request.GET
    except:
        return HttpResponse(json.dumps(dict(isOk=0, message='Failed to parse request')))
        #do some stuff
    return HttpResponse(json.dumps(dict(isOk=1, args=args)), mimetype='application/json')