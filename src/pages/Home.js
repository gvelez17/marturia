import React, { useEffect } from 'react';
import '../styles/Home.scss';
import MainLayout from '../components/MainLayout';

function Home() {
  useEffect(() => {
    document.title = 'Testimony Database';
  }, []);

  return (
    <MainLayout>
      <div className="home page">
        <div className="wrapper">
          <p><span className="title">The Testimony Database</span> is 
          there were doors all round the hall, but they were all locked; and when Alice had been all the way down one side and up the other, trying every door, she walked sadly down the middle, wondering how she was ever to get out again.</p>
          <p>Suddenly she came upon a little three-legged table, all made of solid glass; there was nothing on it except a tiny golden key, and Alice’s first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted!</p>
          <p>Alice opened the door and found that it led into a small passage, not much larger than a rat-hole: she knelt down and looked along the passage into the loveliest garden you ever saw. How she longed to get out of that dark hall, and wander about among those beds of bright flowers and those cool fountains, but she could not even get her head through the doorway; “and even if my head would go through,” thought poor Alice, “it would be of very little use without my shoulders. Oh, how I wish I could shut up like a telescope! I think I could, if I only knew how to begin.”</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
