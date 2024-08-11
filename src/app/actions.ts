'use server';

import { cookies } from 'next/headers';

export default async function setCookie(value: string): Promise<void> {
  cookies().set({
    name: 'theme',
    value,
    path: '/',
  });
}
