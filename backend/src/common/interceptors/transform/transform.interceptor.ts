import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export type BaseResponse<T> = {
  success: boolean;
  error?: string;
  message?: string;
  payload?: T;
};

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          /**
           * JSend Response Pattern
           * @see {@link https://github.com/omniti-labs/jsend}
           */
          success: true,
          payload: data,
        };
      }),
    );
  }
}
