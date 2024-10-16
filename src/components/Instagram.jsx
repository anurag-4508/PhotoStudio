import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const Instagram = () => {
  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px", 
      origin: "bottom",
      duration: 1000, 
    };

    ScrollReveal().reveal(".instagram__flex img", {
      ...scrollRevealOption,
      interval: 100, 
    });

    const instagram = document.querySelector('.instagram__flex');
    if (instagram) {
      Array.from(instagram.children).forEach((item) => {
        const duplicateNode = item.cloneNode(true);
        duplicateNode.setAttribute('aria-hidden', true);
        instagram.appendChild(duplicateNode);
      });
    }
  }, []);

  return (
    <section className="section__container instagram__container">
      <h2 className="section__header">~ INSTAGRAM ~</h2>
      <div className="instagram__flex">
        <img src="https://ik.imagekit.io/apm2002/Photos/Birthday/Birthday%2027.jpg?updatedAt=1723875145643" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Engagement/Eng%2019.jpg?updatedAt=1723875131303" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Family%20&%20Baby/Birthday%2019.jpg?updatedAt=1723875109955" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Prewedding/Pre%2015.jpg?updatedAt=1723875082862" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Prewedding/Pre%2030.jpg?updatedAt=1723875090943" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Wedding/Wed%2016.jpg?updatedAt=1723875065953" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Wedding/Wed%2036.jpg?updatedAt=1723875074823" alt="instagram" />
        <img src="https://ik.imagekit.io/apm2002/Photos/Wedding/Wed%203.jpg?updatedAt=1723875073338" alt="instagram" />
      </div>
    </section>
  );
};

export default Instagram;
