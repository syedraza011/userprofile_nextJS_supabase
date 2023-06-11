import { useState, useEffect } from "react";
import supabase from "./supabase";

import Link from 'next/link';


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [contactInformation, setContactInformation] = useState('');

  useEffect(() => {
    const session = supabase.auth.session();
    if (session) {
      setUser(session.user);
      fetchProfile(session.user.id);
    } else {
      setUser(null);
      setProfile(null);
    }
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase.from('profiles').select().eq('user_id', userId).single();
    if (error) {
      alert(error.message);
    } else {
      setProfile(data);
      setName(data.name);
      setProfilePicture(data.profile_picture);
      setContactInformation(data.contact_information);
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signIn({ provider: 'google' });
    if (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await supabase.from('profiles').update({
      name,
      profile_picture: profilePicture,
      contact_information: contactInformation,
    }).eq('user_id', user.id);
    if (error) {
      alert(error.message);
    } else {
      alert('Profile updated successfully!');
      fetchProfile(user.id);
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {!user && (
            <li>
              <button onClick={handleLogin}>Sign in</button>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sign out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <>
          <h1>Welcome, {user.email}!</h1>
          {profile && (
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <br />
              <label>
                Profile Picture:
                <input type="text" value={profilePicture} onChange={(event) => setProfilePicture(event.target.value)} />
              </label>
              <br />
              <label>
                Contact Information:
                <input type="text" value={contactInformation} onChange={(event) => setContactInformation(event.target.value)} />
              </label>
              <br />
              <button type="submit">Save Changes</button>
            </form>
          )}
        </>
      )}
    </>
  );
}
