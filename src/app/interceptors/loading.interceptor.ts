import { HttpInterceptorFn } from '@angular/common/http';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('passing request:', req.url);
  return next(req);
};
