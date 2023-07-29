


const controllerPosts = (allPosts, req) => {
    const posts = allPosts.map((post) => {
        const isMine = post.author._id.toString() === req.userId.toString();
        if (isMine) {
            return {
                ...post._doc,
                isMine,
            };
        } else {
            const isSaved = post.howSave.includes(req.userId);
            return {
                ...post._doc,
                isSaved,
                isMine,
            };

        }
    });
    return posts;
}


module.exports = controllerPosts;
