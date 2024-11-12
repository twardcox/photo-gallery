import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';
// import { CodeSnippet } from "@/components/code-snippet";
import { getUserProfileData } from '@/services/profile.service';

const Profile: NextPage = withPageAuthRequired(
  async () => {
    const user = await getUserProfileData();

    return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              <strong>Only authenticated users should access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <Image
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
                width={80}
                height={80}
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              {/* <CodeSnippet
                title="User Profile Object"
                code={JSON.stringify(user, null, 2)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  },
  { returnTo: 'admin/profile' },
);

export default Profile;
