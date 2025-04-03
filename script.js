// Sample data for startups and their reviews
const startups = [
    {
      id: 1,
      name: "Tech Innovators",
      reviews: [
        { id: 1, content: "Great startup!", status: "pending" },
        { id: 2, content: "Needs more innovation.", status: "pending" }
      ]
    },
    {
      id: 2,
      name: "Green Ventures",
      reviews: [
        { id: 3, content: "Eco-friendly solutions are amazing!", status: "pending" }
      ]
    }
  ];
  
  // Function to render the startups and reviews
  function renderStartups() {
    const startupList = document.getElementById("startup-list");
    startupList.innerHTML = "";
  
    startups.forEach((startup) => {
      const startupDiv = document.createElement("div");
      startupDiv.classList.add("startup");
  
      // Add startup name
      startupDiv.innerHTML = `<h3>${startup.name}</h3>`;
  
      // Create review list
      const reviewList = document.createElement("div");
      reviewList.classList.add("review-list");
  
      startup.reviews.forEach((review) => {
        if (review.status === "pending") {
          const reviewDiv = document.createElement("div");
          reviewDiv.classList.add("pending-review");
          reviewDiv.innerHTML = `
            <p>${review.content}</p>
            <button class="approve" onclick="moderateReview(${startup.id}, ${review.id}, 'approved')">Approve</button>
            <button class="reject" onclick="moderateReview(${startup.id}, ${review.id}, 'rejected')">Reject</button>
          `;
          reviewList.appendChild(reviewDiv);
        }
      });
  
      startupDiv.appendChild(reviewList);
      startupList.appendChild(startupDiv);
    });
  }
  
  // Function to moderate reviews
  function moderateReview(startupId, reviewId, newStatus) {
    const startup = startups.find((s) => s.id === startupId);
    const review = startup.reviews.find((r) => r.id === reviewId);
  
    if (review) {
      review.status = newStatus;
      alert(`Review ${newStatus}`);
      renderStartups();
    }
  }
  
  // Initial render
  renderStartups();