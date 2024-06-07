import { Inject, Injectable } from '@angular/core';

interface Environment {
  djangoUrl: string;
  appBaseUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor(@Inject('env') private environment: Environment) {}

  getEnvironment(): Environment {
    return this.environment;
  }
  getValue<K extends keyof Environment>(
    str: K,
    defaultValue: Environment[K] = ''
  ): Environment[K] {
    return this.environment[str] ?? defaultValue;
  }
}
