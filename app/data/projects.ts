export type ProjectsType = {
  slug: string;
  title: string;
  year: number;
  month: number;
  description: string;
  venue?: { name: string; link: string };
  location?: string;
  text: string;
  collaborators?: [{ name: string; link: string }];
  video?: string;
  photos?: string[];
};

export const projects: ProjectsType[] = [
  {
    title: "vid synth",
    year: 2021,
    month: 5,
    // venue: { name: "Cinemathéque", link: "https://cinematheque-leipzig.de/" },
    // location: "Leipzig, Germany",
    description: "custom video synthesizer used to make live visuals",
    text: "My video synthesizer is custom built in TouchDesigner, and controlled via Midi. It is inspired by analogue video synthesizers of past. It is an oscillating ramp that goes through several layers of distortion, feedback, and compositing in order to produce the glitchy low-fi visuals. I play it live along with the bands I perform with, making changes and activating triggers to the music. On its own it has barely any audio-reactivity, but through my playing it appears so. I often make recordings of my live performances, taking audio, visuals and camera footage to compose an impression of the evenening.",
    video: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/vid_synth/vid_synth-thumb_vj8w4x.mp4`,
    slug: "deanwallflower",
    photos: [
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/vid_synth/vid_synth-1_q7d1de.mp4
    `,
    ],
    // collaborators: [
    //   { name: "Judith Meister", link: "https://www.judithmeister.de/en/about" },
    // ],
  },
  {
    title: "cinemasher",
    year: 2024,
    month: 5,
    venue: { name: "Cinemathéque", link: "https://cinematheque-leipzig.de/" },
    location: "Leipzig, Germany",
    description:
      "interactive video masher controlled via website using websockets",
    text: "Cinemasher is an installative experiment and a critical examination of how we consume media today. Every day, we are presented with complex topics in social media that are taken out of context and summarised in a simplified way by opinionated influencers and journalists who lack the necessary depth. What is left after this kind of media consumption apart from a feeling of something? What does it leave us with when we form our opinions in this way?",
    video: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/cinemasher/cinemasher-thumb_pnjgnf.mp4`,
    slug: "cinemasher",
    photos: [
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/cinemasher/cinemasher-thumb_pnjgnf.mp4`,
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/cinemasher/cinemasher-1_1_yc0vgz.mp4`,
    ],
    collaborators: [
      { name: "Judith Meister", link: "https://www.judithmeister.de/en/about" },
    ],
  },
  {
    title: "grimm",
    year: 2024,
    month: 5,
    venue: { name: "Werk2", link: "https://www.werk-2.de/" },
    location: "Leipzig, Germany",
    description: "live visuals for heavy synth doom project",
    text: "The collaboration with Grimm is ongoing and has developed over time. I control my video synthesizer and 6 DMX lights simultaneously. The parameters are linked, for example the colors, speed of motion and strobing effects. It creates a cohesive visual world and supports the musicians stage presence. The visuals were projected on to a set of tall white curtains, and for the final song of the set a fan is activated to cause turbulence on the surface, giving the appearance of a storm busting open a window. Below is a pre-visualization 3D render I made before the concert, and then another video showing the result.",
    video: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/grimm/grimm_thumb_gfmcit.mp4`,
    slug: "grimm-at-werk2",
    collaborators: [
      { name: "Grimm", link: "https://www.instagram.com/gr_imm_music/" },
    ],
    photos: [
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/grimm/grimm-2_1_uoqd1a.mp4`,
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/grimm/grimm-1_mueiup.mp4`,
    ],
  },
  {
    title: "soundtravelers",
    year: 2023,
    month: 5,
    venue: { name: "MdbK", link: "https://mdbk.de/en/" },
    location: "Leipzig, Germany",
    description: "live visuals for classical ensemble",
    text: "For this project I was resonpsible for the supporting live visuals for the ensemble Soundtravelers, performing their wandering concert format the Museum der bildenden Künste in Leipzig. I controlled three projections from my station and faded them in and out accordingly throughout the concert.",
    video: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/soundtravelers/soundtravlers-thumb_k7nemz.mp4`,
    slug: "sound-travelers-at-mdbk",
    photos: [
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/soundtravelers/soundtravelers-2_ruytr2.mp4`,
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/projects/soundtravelers/soundtravelers-1_csrop7.jpg`,
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/projects/soundtravelers/soundtravelers-2_dmbia7.jpg`,
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/projects/soundtravelers/soundtravelers-3_tftv5t.jpg`,
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/video/upload/projects/soundtravelers/soundtravelers-1_wlaytu.mp4`,
    ],
    collaborators: [
      {
        name: "Soundtravelers",
        link: "https://www.instagram.com/soundtravelers_/",
      },
      // @ts-ignore
      { name: "Anzu", link: "https://www.instagram.com/anzulin/" },
    ],
  },
];
