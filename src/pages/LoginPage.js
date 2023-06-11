import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
}
