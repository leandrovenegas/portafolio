const portfolio = {
  organizations: [
    {
      id: 1,
      name: "Rayandola",
      slug: "rayandola",
      type: "collective",
      website: null,
      parentOrganizationId: null,
    },
    {
      id: 2,
      name: "CrazyRoom",
      slug: "crazyroom",
      type: "brand",
      website: null,
      parentOrganizationId: 1,
    },
    {
      id: 3,
      name: "Dragon Lab",
      slug: "dragon-lab",
      type: "agency",
      website: null,
      parentOrganizationId: 1,
    },
  ],

  projects: [
    {
      id: 101,
      title: "CrazyRoom Session #04",
      slug: "crazyroom-session-04",
      date: "2026-02-01",
      ownerOrganizationId: 2,
      clientOrganizationId: null,
      coverImage: "/images/session04.jpg",
      markdownUrl: "/content/session04.md",
      status: "published",
    },
  ],

  mediaItems: [
    {
      id: 1001,
      projectId: 101,
      type: "video",
      title: "Full DJ Set",
      url: "https://youtube.com/example",
      thumbnail: "/images/thumb.jpg",
      alt: "DJ performing live",
      caption: "Live recording session",
      order: 1,
    },
  ],
};

export default portfolio;