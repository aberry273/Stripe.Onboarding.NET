

export default () => ({
    // PROPERTIES
    thread: {},
    posts: [],
    replies: [],
    reviews: [],
    // INIT
    init() {
    },
    getDummyThread() {
        return exampleThread
    },
    getDummyPosts() {
        return exampleFeed;
    },
    setThread(post) {
        this.thread = post;
    },
    setPosts(posts) {
        this.posts = posts;
    },
    addPosts(posts) {
        this.posts.concat(posts);
    },
    addPost(post) {
        this.posts.push(post);
    },
    setReviews(reviews) {
        this.reviews = reviews;
    },
    addReviews(reviews) {
        this.reviews.concat(reviews);
    },
    addReview(review) {
        this.posts.push(review);
    },
    addReply(posts) {
        this.posts.concat(posts);
    },
    addPost(post) {
        this.posts.push(post);
    },
    updatePosts(wssMessage) {
        const item = wssMessage.data;
        if (this.posts == null) this.posts = [];
        if (wssMessage.update == 'Created') {
            const index = this.posts.map(x => x.id).indexOf(item.id);
            if (index == -1) this.posts.push(item);
            else this.posts[index] = item
        }
        if (wssMessage.update == 'Updated') {
            const index = this.posts.map(x => x.id).indexOf(item.id);
            this.posts[index] = item
        }
        if (wssMessage.update == 'Deleted') {
            const index = this.posts.map(x => x.id).indexOf(item.id);
            this.posts.splice(index, 1);
        }
    },
    updateReviews(wssMessage) {
        const item = wssMessage.data;
        if (this.reviews == null) this.reviews = [];
        if (wssMessage.update == 'Created') {
            const index = this.reviews.map(x => x.id).indexOf(item.id);
            if (index == -1) this.reviews.push(item);
            else this.reviews[index] = item
        }
        if (wssMessage.update == 'Updated') {
            const index = this.reviews.map(x => x.id).indexOf(item.id);
            this.reviews[index] = item
        }
        if (wssMessage.update == 'Deleted') {
            const index = this.reviews.map(x => x.id).indexOf(item.id);
            this.reviews.splice(index, 1);
        }
    },
})


const exampleThread = {
    "id": "c2f116d3-9b49-4827-8221-425b7d5d4ad7",
    "createdOn": "2024-04-01T21:09:29.9859812Z",
    "updatedOn": "2024-04-03T16:05:24.5456026+13:00",
    "threadId": "0xbxwkmbJ0iCIUJbfV1K1w",
    "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
    "parentId": null,
    "status": 0,
    "content": "wdqqwdqwd",
    "targetThread": "",
    "targetChannel": "",
    "category": "",
    "tags": [
        "test123", "dqw2e12dwqdqwwd", "qddwdwq"
    ],
    "reviews": {
      "agrees": 3,
      "disagrees": 7,
      "likes": 0,
      "replies": null
    },
    "threadIds": null,
    "threads": [
      {
        "id": "3cd8e2fd-6d3b-4cd8-a898-7e4e38c11522",
        "createdOn": "2024-04-03T18:20:28.1871323Z",
        "updatedOn": null,
        "threadId": "eLYPDtt2EyomH5OOMEVIg",
        "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
        "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
        "status": 1,
        "content": "ddwdw",
        "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
        "targetChannel": "",
        "category": "",
        "tags": null,
        "reviews": null,
        "threadIds": null,
        "threads": null,
        "username": "tester",
        "agrees": 0,
        "disagrees": 0,
        "likes": 0,
        "replies": null
      },
      {
        "id": "902758a1-6b5d-4d66-b499-629fed8ac91c",
        "createdOn": "2024-04-03T18:22:11.3074061Z",
        "updatedOn": null,
        "threadId": "oVgnkF1rZk20mWKf7YrJHA",
        "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
        "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
        "status": 1,
        "content": "wdqwdqdqw",
        "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
        "targetChannel": "",
        "category": "",
        "tags": null,
        "reviews": null,
        "threadIds": null,
        "threads": null,
        "username": "tester",
        "agrees": 0,
        "disagrees": 0,
        "likes": 0,
        "replies": null
      },
      {
        "id": "eb74d8c0-38c1-42dd-9973-0f8fa769a823",
        "createdOn": "2024-04-03T18:22:29.3753639Z",
        "updatedOn": null,
        "threadId": "wNh068E43UKZcwPp2moIw",
        "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
        "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
        "status": 1,
        "content": "qwdwdq",
        "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
        "targetChannel": "",
        "category": "",
        "tags": null,
        "reviews": null,
        "threadIds": null,
        "threads": null,
        "username": "tester",
        "agrees": 0,
        "disagrees": 0,
        "likes": 0,
        "replies": null
      }
    ],
    "username": "tester",
    "agrees": 3,
    "disagrees": 7,
    "likes": 0,
    "replies": 3
  }

  const exampleFeed = [{
    "id": "3016f819-7c6c-4667-9875-59f27981a4c9",
    "createdOn": "2024-04-01T21:09:29.9859812Z",
    "updatedOn": "2024-04-03T16:05:24.5456026+13:00",
    "threadId": "GfgWMGx8Z0aYdVnyeYGkyQ",
    "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
    "parentId": null,
    "status": 0,
    "content": "wdqqwdqwd",
    "targetThread": "",
    "targetChannel": "",
    "category": "",
    "tags": [
        "test123", "dqw2e12dwqdqwwd", "qddwdwq"
    ],
    "reviews": {
      "agrees": 3,
      "disagrees": 7,
      "likes": 0,
      "replies": null
    },
    "threadIds": null,
    "threads": [
      {
        "id": "3cd8e2fd-6d3b-4cd8-a898-7e4e38c11522",
        "createdOn": "2024-04-03T18:20:28.1871323Z",
        "updatedOn": null,
        "threadId": "eLYPDtt2EyomH5OOMEVIg",
        "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
        "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
        "status": 1,
        "content": "ddwdw",
        "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
        "targetChannel": "",
        "category": "",
        "tags": null,
        "reviews": null,
        "threadIds": null,
        "threads": null,
        "username": "tester",
        "agrees": 0,
        "disagrees": 0,
        "likes": 0,
        "replies": null
      },
      {
        "id": "902758a1-6b5d-4d66-b499-629fed8ac91c",
        "createdOn": "2024-04-03T18:22:11.3074061Z",
        "updatedOn": null,
        "threadId": "oVgnkF1rZk20mWKf7YrJHA",
        "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
        "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
        "status": 1,
        "content": "wdqwdqdqw",
        "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
        "targetChannel": "",
        "category": "",
        "tags": null,
        "reviews": null,
        "threadIds": null,
        "threads": null,
        "username": "tester",
        "agrees": 0,
        "disagrees": 0,
        "likes": 0,
        "replies": null
      },
      {
        "id": "eb74d8c0-38c1-42dd-9973-0f8fa769a823",
        "createdOn": "2024-04-03T18:22:29.3753639Z",
        "updatedOn": null,
        "threadId": "wNh068E43UKZcwPp2moIw",
        "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
        "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
        "status": 1,
        "content": "qwdwdq",
        "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
        "targetChannel": "",
        "category": "",
        "tags": null,
        "reviews": null,
        "threadIds": null,
        "threads": null,
        "username": "tester",
        "agrees": 0,
        "disagrees": 0,
        "likes": 0,
        "replies": null
      }
    ],
    "username": "tester",
    "agrees": 3,
    "disagrees": 7,
    "likes": 0,
    "replies": 3
  },
    {
      "id": "3cd8e2fd-6d3b-4cd8-a898-7e4e38c11522",
      "createdOn": "2024-04-03T18:20:28.1871323Z",
      "updatedOn": null,
      "threadId": "eLYPDtt2EyomH5OOMEVIg",
      "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
      "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
      "status": 1,
      "content": "ddwdw",
      "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
      "targetChannel": "",
      "category": "",
      "tags": null,
      "reviews": null,
      "threadIds": null,
      "threads": null,
      "username": "tester",
      "agrees": 0,
      "disagrees": 0,
      "likes": 0,
      "replies": null
    },
    {
      "id": "902758a1-6b5d-4d66-b499-629fed8ac91c",
      "createdOn": "2024-04-03T18:22:11.3074061Z",
      "updatedOn": null,
      "threadId": "oVgnkF1rZk20mWKf7YrJHA",
      "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
      "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
      "status": 1,
      "content": "wdqwdqdqw",
      "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
      "targetChannel": "",
      "category": "",
      "tags": null,
      "reviews": null,
      "threadIds": null,
      "threads": null,
      "username": "tester",
      "agrees": 0,
      "disagrees": 0,
      "likes": 0,
      "replies": null
    },
    {
      "id": "eb74d8c0-38c1-42dd-9973-0f8fa769a823",
      "createdOn": "2024-04-03T18:22:29.3753639Z",
      "updatedOn": null,
      "threadId": "wNh068E43UKZcwPp2moIw",
      "userId": "b2edca69-6743-4f71-969c-08dc4f9da45c",
      "parentId": "3016f819-7c6c-4667-9875-59f27981a4c9",
      "status": 1,
      "content": "qwdwdq",
      "targetThread": "GfgWMGx8Z0aYdVnyeYGkyQ",
      "targetChannel": "",
      "category": "",
      "tags": null,
      "reviews": null,
      "threadIds": null,
      "threads": null,
      "username": "tester",
      "agrees": 0,
      "disagrees": 0,
      "likes": 0,
      "replies": null
    }
]
