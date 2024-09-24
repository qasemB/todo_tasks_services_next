'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerPage() {
  return (
    <div dir='ltr' className='swagger_container'>
      <SwaggerUI url="/swagger/swagger-api" />
    </div>
  );
}