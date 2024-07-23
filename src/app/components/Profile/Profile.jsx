import Main from '../../layout/main/Main/Main';
import ProfileCover from '../ProfileCover/ProfileCover';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileGrid from '../ProfileGrid/ProfileGrid';

import './Profile.scss';

const Profile = ({ author, setActiveTab }) => {
  const body = (
    <>
      <ProfileCover user={author} />

      <div className="main-body__content page-profile__content row row-16">
        <div className="col col-2 col-xl-1 col-lg-0"></div>

        <div className="col col-12 col-xl-10 col-lg-12">
          <ProfileInfo
            user={author}
            className="page-profile__info"
            setActiveTab={setActiveTab}
          />

          <ProfileGrid user={author} className="page-profile__grid" />
        </div>

        <div className="col col-2 col-xl-1 col-lg-0"></div>
      </div>
    </>
  );

  return <Main body={body} className="page-profile" />;
};

export default Profile;
