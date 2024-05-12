import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

//SE IMPLEMENTA UN INTERCEPTOR PARA ATRAPAR TODAS LAS PETICIONES HTTP Y AUTOMATICAMENTE
//DESPLIEGUE UN LOADDING
//ESTO SE IMPLEMENTA EN EL APP COMPONENT, PARA QUE ABARQUE TODA LA APLICACION
export const loadingInterceptor: HttpInterceptorFn = (req, next,) => {
    const loadingService = inject(LoadingService);
    loadingService.showLoading();
    return next(req).pipe(finalize(() => loadingService.hideLoading()));
};
