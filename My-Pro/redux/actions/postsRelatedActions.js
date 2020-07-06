import API from "./../../api";
import validateToken from "./../validateToken";
import { AsyncStorage } from "react-native";

import {
  CREATE_POST,
  CREATE_POST_ERROR,
  FETCHED_POSTS,
  FETCHING_POSTS_ERROR,
  IS_LOADING_POSTS,
  IS_COMMENT_INSERTED,
  COMMENT_INSERTION_ERROR,
  IS_REACTION_UPSERTED,
  REACTION_UPSERTION_ERROR,
  PROFILE_PAGE_USER_DETAILS_AND_POSTS,
  PROFILE_PAGE_USER_DETAILS_AND_POSTS_ERROR,
} from "./../actionTypes/postsRelatedTypes";

let headers = {
  "Content-Type": "application/json",
};

// All types of post creation handler -- Starts
let apiEndPoint;
let photosPayload = new FormData();
export const createPost = (
  authToken,
  postedTo,
  postTypeId,
  postDetailsObject
) => {
  // console.log("authToken --> " + authToken);
  // console.log("postedTo --> " + postedTo);
  // console.log("postTypeId --> " + postTypeId);
  // console.log("postDetailsObject is below --> ");
  // console.log(postDetailsObject);
  headers["x-auth-token"] = authToken;

  if (
    postTypeId === 1 ||
    postTypeId === 2 ||
    postTypeId === 3 ||
    postTypeId === 4 ||
    postTypeId === 5
  ) {
    let postDetailsObj;
    if (postTypeId === 1) {
      apiEndPoint = "posts/create-post/1";
      // console.log("postContent --> " + postDetailsObject.postContentProp);
      postDetailsObj = {
        postContent: postDetailsObject.postContentProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postTypeId,
        postedTo,
      };
    } else if (postTypeId === 2) {
      apiEndPoint = "posts/create-post/2";
      // console.log("postImages is below");
      // console.log(postDetailsObject.postImagesProp);
      postDetailsObj = {
        postImages: postDetailsObject.postImagesProp,
        privacyId: postDetailsObject.postPrivacyProp,
        postContent: postDetailsObject.postContentProp,
        postTypeId,
        postedTo,
      };

      photosPayload.append("postContent", postDetailsObject.postContentProp);
      photosPayload.append("postImages", postDetailsObject.postImagesProp);
      photosPayload.append("privacyId", postDetailsObject.postPrivacyProp);
      photosPayload.append("postTypeId", postTypeId);
      photosPayload.append("postedTo", postedTo);

      postDetailsObject.postImagesProp.forEach((file) => {
        photosPayload.append("images", file);
      });
    } else if (postTypeId === 3 || postTypeId === 4 || postTypeId === 5) {
      apiEndPoint = `posts/create-post/${postTypeId}`;
      // console.log("postContent --> " + postDetailsObject.postContent);
      postDetailsObj = {
        postContent: postDetailsObject.postContent,
        privacyId: postDetailsObject.postPrivacy,
        postTypeId,
        postedTo,
        backgroundColor: postDetailsObject.backgroundColor,
        textColor: postDetailsObject.textColor,
      };

      if (postTypeId === 4) {
        postDetailsObj.borderColor = postDetailsObject.borderColor;
        postDetailsObj.borderStyle = postDetailsObject.borderStyle;
        postDetailsObj.borderStyleSides = postDetailsObject.borderStyleSides;
      } else if (postTypeId === 5) {
        postDetailsObj.cornerStyle = postDetailsObject.cornerStyle;
        postDetailsObj.cornerStyleSides = postDetailsObject.cornerStyleSides;
      }
    }

    if (
      postTypeId === 1 ||
      postTypeId === 3 ||
      postTypeId === 4 ||
      postTypeId === 5
    ) {
      headers["Content-Type"] = "application/json";

      return (dispatch) => {
        API.post(apiEndPoint, postDetailsObj, { headers })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: CREATE_POST });
          })
          .catch((err) => {
            console.log(err.response.data);
            dispatch({
              type: CREATE_POST_ERROR,
              payload: err.response.data.msg,
            });
          });
      };
    } else if (postTypeId === 2) {
      // console.log("photosPayload is below");
      // console.log(photosPayload);
      // headers["Content-Type"] = "multipart/form-data";
      headers["Content-Type"] = "application/json";

      return (dispatch) => {
        API.post(apiEndPoint, photosPayload, { headers })
          .then((res) => {
            console.log(res.data);
            dispatch({ type: CREATE_POST });
          })
          .catch((err) => {
            console.log(err.response.data);
            dispatch({
              type: CREATE_POST_ERROR,
              payload: err.response.data.msg,
            });
          });
      };
    }
  }
};
// All types of post creation handler -- Ends

// Fetching individual user's posts handler -- Starts
export const getAllUsersPosts = () => {
  return async (dispatch) => {
    let authToken = await AsyncStorage.getItem("authToken");
    const tokenUserDetails = await validateToken();
    // console.log(tokenUserDetails);
    if (tokenUserDetails) {
      apiEndPoint = `posts`;
      headers["x-auth-token"] = authToken;

      // dispatch({ type: IS_LOADING_POSTS });
      return API.get(apiEndPoint, { headers })
        .then((res) => {
          // console.log(res.data);
          dispatch({ type: FETCHED_POSTS, payload: res.data });
          return { status: "success", msg: "posts received", posts: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: FETCHING_POSTS_ERROR,
            payload: err.response,
          });
          return new Error(err.response);
        });
    } else {
      return new Error("Something went wrong");
    }
  };
};
// Fetching individual user's posts handler -- Ends

// Fetching individual user's posts handler -- Starts
export const getIndividualUserPosts = (userId) => {
  // console.log("userId --> " + userId);

  return async (dispatch) => {
    let authToken = await AsyncStorage.getItem("authToken");
    const tokenUserDetails = await validateToken();
    // console.log(tokenUserDetails);
    if (tokenUserDetails) {
      apiEndPoint = `posts/postedTo/${userId}`;
      headers["x-auth-token"] = authToken;

      // dispatch({ type: IS_LOADING_POSTS });
      return API.get(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: FETCHED_POSTS, payload: res.data });
          return { status: "success", msg: "posts received", posts: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: FETCHING_POSTS_ERROR,
            payload: err.response,
          });
          return new Error(err.response);
        });
    } else {
      return new Error("Something went wrong");
    }
  };
};
// Fetching individual user's posts handler -- Ends

// Fetching speciic post with postId handler -- Starts
export const getSinglePost = (postId) => {
  // console.log("postId --> " + postId);
  let authToken = AsyncStorage.getItem("authToken");
  const tokenUserDetails = validateToken();

  apiEndPoint = `posts/${postId}`;
  headers["x-auth-token"] = authToken;

  if (tokenUserDetails) {
    return (dispatch) => {
      dispatch({ type: IS_LOADING_POSTS });
      API.get(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: FETCHED_POSTS, payload: res.data });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: FETCHING_POSTS_ERROR,
            payload: err.response,
          });
        });
    };
  }
};
// Fetching speciic post with postId handler -- Ends

// Fetching profilePageUserDetails & posts with username handler -- Starts
export const getProfileUserDetailsAndPosts = (username) => {
  // console.log("username --> " + username);
  return async (dispatch) => {
    let authToken = await AsyncStorage.getItem("authToken");
    const tokenUserDetails = validateToken();

    apiEndPoint = `users/by-username/${username}`;
    headers["x-auth-token"] = authToken;

    if (tokenUserDetails) {
      // dispatch({ type: IS_LOADING_POSTS });
      return API.get(apiEndPoint, { headers })
        .then((res) => {
          // console.log(res.data);
          dispatch({
            type: PROFILE_PAGE_USER_DETAILS_AND_POSTS,
            payload: res.data,
          });
          return {
            status: "success",
            msg: "posts received",
            details: res.data,
          };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: PROFILE_PAGE_USER_DETAILS_AND_POSTS_ERROR,
            payload: err.response,
          });
          return new Error(err.response);
        });
    } else {
      return new Error("Something went wrong");
    }
  };
};
// Fetching profilePageUserDetails & posts with username handler -- Ends

// Deleting single post handler -- Starts
export const deletePost = (postId) => {
  let authToken = AsyncStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  if (tokenUserDetails && postId) {
    // console.log("userId --> " + userId);
    apiEndPoint = `posts/${postId}`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.delete(apiEndPoint, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: IS_COMMENT_INSERTED });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: COMMENT_INSERTION_ERROR,
            payload: err.response,
          });
        });
    };
  } else {
    alert("Either token OR postId is not valid");
  }
};
// Deleting single post handler -- Ends

// Fetching individual post's comment insertion handler -- Starts
export const addComment = (postId, commentText, uniqueCommentId) => {
  let authToken = AsyncStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  console.log("tokenUserDetails -> " + tokenUserDetails);
  console.log("postId -> " + postId);
  console.log("commentText -> " + commentText);
  console.log("uniqueCommentId -> " + uniqueCommentId);
  if (tokenUserDetails && postId && commentText && uniqueCommentId) {
    let obj = {
      postId,
      comment: commentText,
      uniqueCommentId,
    };
    // console.log("userId --> " + userId);
    apiEndPoint = `posts/addComment`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: IS_COMMENT_INSERTED });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: COMMENT_INSERTION_ERROR,
            payload: err.response,
          });
        });
    };
  } else {
    alert(
      "Either token OR postId OR commentText OR uniqueCommentId is not valid"
    );
  }
};
// Fetching individual post's comment insertion handler -- Ends

// Fetching individual post's comment deletion handler -- Starts
export const deleteComment = (postId, uniqueCommentId) => {
  let authToken = AsyncStorage.getItem("authToken");
  const tokenUserDetails = validateToken();
  // console.log(tokenUserDetails);
  // let userId;
  if (tokenUserDetails && postId && uniqueCommentId) {
    let obj = {
      postId,
      uniqueCommentId,
    };
    // console.log("userId --> " + userId);
    apiEndPoint = `posts/deleteComment`;
    headers["x-auth-token"] = authToken;

    return (dispatch) => {
      API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: IS_COMMENT_INSERTED });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: COMMENT_INSERTION_ERROR,
            payload: err.response,
          });
        });
    };
  } else {
    alert("Either token OR postId OR uniqueCommentId is not valid");
  }
};
// Fetching individual post's comment deletion handler -- Ends

// Fetching individual posts's reaction handler -- Starts
export const upsertReaction = (postId, actionType, reactionTypeId) => {
  return async (dispatch) => {
    let authToken = await AsyncStorage.getItem("authToken");
    const tokenUserDetails = await validateToken();
    // console.log(tokenUserDetails);
    // let userId;
    if (tokenUserDetails) {
      let obj = {
        postId,
        reactionTypeId,
      };
      // console.log("userId --> " + userId);
      if (actionType === "add") {
        apiEndPoint = `posts/addReaction`;
      } else {
        apiEndPoint = `posts/deleteReaction`;
      }
      headers["x-auth-token"] = authToken;

      return API.put(apiEndPoint, obj, { headers })
        .then((res) => {
          // console.log(res.data);
          dispatch({ type: IS_REACTION_UPSERTED });
          return { status: "success", msg: "posts received", posts: res.data };
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({
            type: REACTION_UPSERTION_ERROR,
            payload: err.response,
          });
          return new Error(err.response);
        });
    } else {
      return new Error("Something went wrong");
    }
  };
};
// Fetching individual posts's reaction handler -- Ends
