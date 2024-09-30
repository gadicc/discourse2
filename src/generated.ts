import { operations } from "./schema";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}

export default class DiscourseAPIGenerated {
  _exec<T>(operationName: string, params?: any) { throw new Error('Not implemented'); }

  /**
   * List backups
   */
  getBackups() {
    return this._exec<operations['getBackups']>('getBackups') as unknown as Promise<Prettify<operations['getBackups']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Create backup
   */
  createBackup() {
    return this._exec<operations['createBackup']>('createBackup') as unknown as Promise<Prettify<operations['createBackup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Send download backup email
   */
  sendDownloadBackupEmail(params: Prettify<operations['sendDownloadBackupEmail']['parameters']['path']>) {
    return this._exec<operations['sendDownloadBackupEmail']>('sendDownloadBackupEmail', params);
  }

  /**
   * Download backup
   */
  downloadBackup(params: Prettify<operations['downloadBackup']['parameters']['path']> & Prettify<operations['downloadBackup']['parameters']['query']>) {
    return this._exec<operations['downloadBackup']>('downloadBackup', params);
  }

  /**
   * List badges
   */
  adminListBadges() {
    return this._exec<operations['adminListBadges']>('adminListBadges') as unknown as Promise<Prettify<operations['adminListBadges']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Create badge
   */
  createBadge() {
    return this._exec<operations['createBadge']>('createBadge') as unknown as Promise<Prettify<operations['createBadge']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update badge
   */
  updateBadge(params: Prettify<operations['updateBadge']['parameters']['path']>) {
    return this._exec<operations['updateBadge']>('updateBadge', params) as unknown as Promise<Prettify<operations['updateBadge']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Delete badge
   */
  deleteBadge(params: Prettify<operations['deleteBadge']['parameters']['path']>) {
    return this._exec<operations['deleteBadge']>('deleteBadge', params);
  }

  /**
   * Creates a category
   */
  createCategory() {
    return this._exec<operations['createCategory']>('createCategory') as unknown as Promise<Prettify<operations['createCategory']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Retrieves a list of categories
   */
  listCategories(params?: Prettify<operations['listCategories']['parameters']['query']>) {
    return this._exec<operations['listCategories']>('listCategories', params) as unknown as Promise<Prettify<operations['listCategories']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Updates a category
   */
  updateCategory(params: Prettify<operations['updateCategory']['parameters']['path']>) {
    return this._exec<operations['updateCategory']>('updateCategory', params) as unknown as Promise<Prettify<operations['updateCategory']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * List topics
   */
  listCategoryTopics(params: Prettify<operations['listCategoryTopics']['parameters']['path']>) {
    return this._exec<operations['listCategoryTopics']>('listCategoryTopics', params) as unknown as Promise<Prettify<operations['listCategoryTopics']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Show category
   */
  getCategory(params: Prettify<operations['getCategory']['parameters']['path']>) {
    return this._exec<operations['getCategory']>('getCategory', params) as unknown as Promise<Prettify<operations['getCategory']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Create a group
   */
  createGroup() {
    return this._exec<operations['createGroup']>('createGroup') as unknown as Promise<Prettify<operations['createGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Delete a group
   */
  deleteGroup(params: Prettify<operations['deleteGroup']['parameters']['path']>) {
    return this._exec<operations['deleteGroup']>('deleteGroup', params) as unknown as Promise<Prettify<operations['deleteGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update a group
   */
  updateGroup(params: Prettify<operations['updateGroup']['parameters']['path']>) {
    return this._exec<operations['updateGroup']>('updateGroup', params) as unknown as Promise<Prettify<operations['updateGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a group
   */
  getGroup(params: Prettify<operations['getGroup']['parameters']['path']>) {
    return this._exec<operations['getGroup']>('getGroup', params) as unknown as Promise<Prettify<operations['getGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * List group members
   */
  listGroupMembers(params: Prettify<operations['listGroupMembers']['parameters']['path']>) {
    return this._exec<operations['listGroupMembers']>('listGroupMembers', params) as unknown as Promise<Prettify<operations['listGroupMembers']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Add group members
   */
  addGroupMembers(params: Prettify<operations['addGroupMembers']['parameters']['path']>) {
    return this._exec<operations['addGroupMembers']>('addGroupMembers', params) as unknown as Promise<Prettify<operations['addGroupMembers']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Remove group members
   */
  removeGroupMembers(params: Prettify<operations['removeGroupMembers']['parameters']['path']>) {
    return this._exec<operations['removeGroupMembers']>('removeGroupMembers', params) as unknown as Promise<Prettify<operations['removeGroupMembers']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * List groups
   */
  listGroups() {
    return this._exec<operations['listGroups']>('listGroups') as unknown as Promise<Prettify<operations['listGroups']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Create an invite
   */
  createInvite() {
    return this._exec<operations['createInvite']>('createInvite') as unknown as Promise<Prettify<operations['createInvite']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Create multiple invites
   */
  createMultipleInvites() {
    return this._exec<operations['createMultipleInvites']>('createMultipleInvites') as unknown as Promise<Prettify<operations['createMultipleInvites']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get the notifications that belong to the current user
   */
  getNotifications() {
    return this._exec<operations['getNotifications']>('getNotifications') as unknown as Promise<Prettify<operations['getNotifications']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Mark notifications as read
   */
  markNotificationsAsRead() {
    return this._exec<operations['markNotificationsAsRead']>('markNotificationsAsRead') as unknown as Promise<Prettify<operations['markNotificationsAsRead']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * List latest posts across topics
   */
  listPosts(params?: Prettify<operations['listPosts']['parameters']['query']>) {
    return this._exec<operations['listPosts']>('listPosts', params) as unknown as Promise<Prettify<operations['listPosts']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Creates a new topic, a new post, or a private message
   */
  createTopicPostPM() {
    return this._exec<operations['createTopicPostPM']>('createTopicPostPM') as unknown as Promise<Prettify<operations['createTopicPostPM']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Retrieve a single post
   */
  getPost(params: Prettify<operations['getPost']['parameters']['path']>) {
    return this._exec<operations['getPost']>('getPost', params) as unknown as Promise<Prettify<operations['getPost']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update a single post
   */
  updatePost(params: Prettify<operations['updatePost']['parameters']['path']>) {
    return this._exec<operations['updatePost']>('updatePost', params) as unknown as Promise<Prettify<operations['updatePost']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * delete a single post
   */
  deletePost(params: Prettify<operations['deletePost']['parameters']['path']>) {
    return this._exec<operations['deletePost']>('deletePost', params);
  }

  /**
   * List replies to a post
   */
  postReplies(params: Prettify<operations['postReplies']['parameters']['path']>) {
    return this._exec<operations['postReplies']>('postReplies', params) as unknown as Promise<Prettify<operations['postReplies']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Lock a post from being edited
   */
  lockPost(params: Prettify<operations['lockPost']['parameters']['path']>) {
    return this._exec<operations['lockPost']>('lockPost', params) as unknown as Promise<Prettify<operations['lockPost']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Like a post and other actions
   */
  performPostAction() {
    return this._exec<operations['performPostAction']>('performPostAction') as unknown as Promise<Prettify<operations['performPostAction']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a list of private messages for a user
   */
  listUserPrivateMessages(params: Prettify<operations['listUserPrivateMessages']['parameters']['path']>) {
    return this._exec<operations['listUserPrivateMessages']>('listUserPrivateMessages', params) as unknown as Promise<Prettify<operations['listUserPrivateMessages']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a list of private messages sent for a user
   */
  getUserSentPrivateMessages(params: Prettify<operations['getUserSentPrivateMessages']['parameters']['path']>) {
    return this._exec<operations['getUserSentPrivateMessages']>('getUserSentPrivateMessages', params) as unknown as Promise<Prettify<operations['getUserSentPrivateMessages']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Search for a term
   */
  search(params?: Prettify<operations['search']['parameters']['query']>) {
    return this._exec<operations['search']>('search', params) as unknown as Promise<Prettify<operations['search']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get site info
   */
  getSite() {
    return this._exec<operations['getSite']>('getSite') as unknown as Promise<Prettify<operations['getSite']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get site basic info
   */
  getSiteBasicInfo() {
    return this._exec<operations['getSiteBasicInfo']>('getSiteBasicInfo') as unknown as Promise<Prettify<operations['getSiteBasicInfo']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a list of tag groups
   */
  listTagGroups() {
    return this._exec<operations['listTagGroups']>('listTagGroups') as unknown as Promise<Prettify<operations['listTagGroups']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Creates a tag group
   */
  createTagGroup() {
    return this._exec<operations['createTagGroup']>('createTagGroup') as unknown as Promise<Prettify<operations['createTagGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a single tag group
   */
  getTagGroup(params: Prettify<operations['getTagGroup']['parameters']['path']>) {
    return this._exec<operations['getTagGroup']>('getTagGroup', params) as unknown as Promise<Prettify<operations['getTagGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update tag group
   */
  updateTagGroup(params: Prettify<operations['updateTagGroup']['parameters']['path']>) {
    return this._exec<operations['updateTagGroup']>('updateTagGroup', params) as unknown as Promise<Prettify<operations['updateTagGroup']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a list of tags
   */
  listTags() {
    return this._exec<operations['listTags']>('listTags') as unknown as Promise<Prettify<operations['listTags']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a specific tag
   */
  getTag(params: Prettify<operations['getTag']['parameters']['path']>) {
    return this._exec<operations['getTag']>('getTag', params) as unknown as Promise<Prettify<operations['getTag']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get specific posts from a topic
   */
  getSpecificPostsFromTopic(params: Prettify<operations['getSpecificPostsFromTopic']['parameters']['path']>) {
    return this._exec<operations['getSpecificPostsFromTopic']>('getSpecificPostsFromTopic', params) as unknown as Promise<Prettify<operations['getSpecificPostsFromTopic']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a single topic
   */
  getTopic(params: Prettify<operations['getTopic']['parameters']['path']>) {
    return this._exec<operations['getTopic']>('getTopic', params) as unknown as Promise<Prettify<operations['getTopic']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Remove a topic
   */
  removeTopic(params: Prettify<operations['removeTopic']['parameters']['path']>) {
    return this._exec<operations['removeTopic']>('removeTopic', params);
  }

  /**
   * Update a topic
   */
  updateTopic(params: Prettify<operations['updateTopic']['parameters']['path']>) {
    return this._exec<operations['updateTopic']>('updateTopic', params) as unknown as Promise<Prettify<operations['updateTopic']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Invite to topic
   */
  inviteToTopic(params: Prettify<operations['inviteToTopic']['parameters']['path']>) {
    return this._exec<operations['inviteToTopic']>('inviteToTopic', params) as unknown as Promise<Prettify<operations['inviteToTopic']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Bookmark topic
   */
  bookmarkTopic(params: Prettify<operations['bookmarkTopic']['parameters']['path']>) {
    return this._exec<operations['bookmarkTopic']>('bookmarkTopic', params);
  }

  /**
   * Update the status of a topic
   */
  updateTopicStatus(params: Prettify<operations['updateTopicStatus']['parameters']['path']>) {
    return this._exec<operations['updateTopicStatus']>('updateTopicStatus', params) as unknown as Promise<Prettify<operations['updateTopicStatus']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get the latest topics
   */
  listLatestTopics(params?: Prettify<operations['listLatestTopics']['parameters']['query']>) {
    return this._exec<operations['listLatestTopics']>('listLatestTopics', params) as unknown as Promise<Prettify<operations['listLatestTopics']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get the top topics filtered by period
   */
  listTopTopics(params?: Prettify<operations['listTopTopics']['parameters']['query']>) {
    return this._exec<operations['listTopTopics']>('listTopTopics', params) as unknown as Promise<Prettify<operations['listTopTopics']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Set notification level
   */
  setNotificationLevel(params: Prettify<operations['setNotificationLevel']['parameters']['path']>) {
    return this._exec<operations['setNotificationLevel']>('setNotificationLevel', params) as unknown as Promise<Prettify<operations['setNotificationLevel']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update topic timestamp
   */
  updateTopicTimestamp(params: Prettify<operations['updateTopicTimestamp']['parameters']['path']>) {
    return this._exec<operations['updateTopicTimestamp']>('updateTopicTimestamp', params) as unknown as Promise<Prettify<operations['updateTopicTimestamp']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Create topic timer
   */
  createTopicTimer(params: Prettify<operations['createTopicTimer']['parameters']['path']>) {
    return this._exec<operations['createTopicTimer']>('createTopicTimer', params) as unknown as Promise<Prettify<operations['createTopicTimer']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get topic by external_id
   */
  getTopicByExternalId(params: Prettify<operations['getTopicByExternalId']['parameters']['path']>) {
    return this._exec<operations['getTopicByExternalId']>('getTopicByExternalId', params);
  }

  /**
   * Creates an upload
   */
  createUpload() {
    return this._exec<operations['createUpload']>('createUpload') as unknown as Promise<Prettify<operations['createUpload']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Initiates a direct external upload
   */
  generatePresignedPut() {
    return this._exec<operations['generatePresignedPut']>('generatePresignedPut') as unknown as Promise<Prettify<operations['generatePresignedPut']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Completes a direct external upload
   */
  completeExternalUpload() {
    return this._exec<operations['completeExternalUpload']>('completeExternalUpload') as unknown as Promise<Prettify<operations['completeExternalUpload']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Creates a multipart external upload
   */
  createMultipartUpload() {
    return this._exec<operations['createMultipartUpload']>('createMultipartUpload') as unknown as Promise<Prettify<operations['createMultipartUpload']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Generates batches of presigned URLs for multipart parts
   */
  batchPresignMultipartParts() {
    return this._exec<operations['batchPresignMultipartParts']>('batchPresignMultipartParts') as unknown as Promise<Prettify<operations['batchPresignMultipartParts']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Abort multipart upload
   */
  abortMultipart() {
    return this._exec<operations['abortMultipart']>('abortMultipart') as unknown as Promise<Prettify<operations['abortMultipart']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Complete multipart upload
   */
  completeMultipart() {
    return this._exec<operations['completeMultipart']>('completeMultipart') as unknown as Promise<Prettify<operations['completeMultipart']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * List badges for a user
   */
  listUserBadges(params: Prettify<operations['listUserBadges']['parameters']['path']>) {
    return this._exec<operations['listUserBadges']>('listUserBadges', params) as unknown as Promise<Prettify<operations['listUserBadges']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Creates a user
   */
  createUser() {
    return this._exec<operations['createUser']>('createUser') as unknown as Promise<Prettify<operations['createUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a single user by username
   */
  getUser(params: Prettify<operations['getUser']['parameters']['path']>) {
    return this._exec<operations['getUser']>('getUser', params) as unknown as Promise<Prettify<operations['getUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update a user
   */
  updateUser(params: Prettify<operations['updateUser']['parameters']['path']>) {
    return this._exec<operations['updateUser']>('updateUser', params) as unknown as Promise<Prettify<operations['updateUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a user by external_id
   */
  getUserExternalId(params: Prettify<operations['getUserExternalId']['parameters']['path']>) {
    return this._exec<operations['getUserExternalId']>('getUserExternalId', params) as unknown as Promise<Prettify<operations['getUserExternalId']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a user by identity provider external ID
   */
  getUserIdentiyProviderExternalId(params: Prettify<operations['getUserIdentiyProviderExternalId']['parameters']['path']>) {
    return this._exec<operations['getUserIdentiyProviderExternalId']>('getUserIdentiyProviderExternalId', params) as unknown as Promise<Prettify<operations['getUserIdentiyProviderExternalId']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update avatar
   */
  updateAvatar(params: Prettify<operations['updateAvatar']['parameters']['path']>) {
    return this._exec<operations['updateAvatar']>('updateAvatar', params) as unknown as Promise<Prettify<operations['updateAvatar']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Update email
   */
  updateEmail(params: Prettify<operations['updateEmail']['parameters']['path']>) {
    return this._exec<operations['updateEmail']>('updateEmail', params);
  }

  /**
   * Update username
   */
  updateUsername(params: Prettify<operations['updateUsername']['parameters']['path']>) {
    return this._exec<operations['updateUsername']>('updateUsername', params);
  }

  /**
   * Get a public list of users
   */
  listUsersPublic(params: Prettify<operations['listUsersPublic']['parameters']['query']>) {
    return this._exec<operations['listUsersPublic']>('listUsersPublic', params) as unknown as Promise<Prettify<operations['listUsersPublic']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a user by id
   */
  adminGetUser(params: Prettify<operations['adminGetUser']['parameters']['path']>) {
    return this._exec<operations['adminGetUser']>('adminGetUser', params) as unknown as Promise<Prettify<operations['adminGetUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Delete a user
   */
  deleteUser(params: Prettify<operations['deleteUser']['parameters']['path']>) {
    return this._exec<operations['deleteUser']>('deleteUser', params) as unknown as Promise<Prettify<operations['deleteUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Activate a user
   */
  activateUser(params: Prettify<operations['activateUser']['parameters']['path']>) {
    return this._exec<operations['activateUser']>('activateUser', params) as unknown as Promise<Prettify<operations['activateUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Deactivate a user
   */
  deactivateUser(params: Prettify<operations['deactivateUser']['parameters']['path']>) {
    return this._exec<operations['deactivateUser']>('deactivateUser', params) as unknown as Promise<Prettify<operations['deactivateUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Suspend a user
   */
  suspendUser(params: Prettify<operations['suspendUser']['parameters']['path']>) {
    return this._exec<operations['suspendUser']>('suspendUser', params) as unknown as Promise<Prettify<operations['suspendUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Silence a user
   */
  silenceUser(params: Prettify<operations['silenceUser']['parameters']['path']>) {
    return this._exec<operations['silenceUser']>('silenceUser', params) as unknown as Promise<Prettify<operations['silenceUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Anonymize a user
   */
  anonymizeUser(params: Prettify<operations['anonymizeUser']['parameters']['path']>) {
    return this._exec<operations['anonymizeUser']>('anonymizeUser', params) as unknown as Promise<Prettify<operations['anonymizeUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Log a user out
   */
  logOutUser(params: Prettify<operations['logOutUser']['parameters']['path']>) {
    return this._exec<operations['logOutUser']>('logOutUser', params) as unknown as Promise<Prettify<operations['logOutUser']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Refresh gravatar
   */
  refreshGravatar(params: Prettify<operations['refreshGravatar']['parameters']['path']>) {
    return this._exec<operations['refreshGravatar']>('refreshGravatar', params) as unknown as Promise<Prettify<operations['refreshGravatar']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a list of users
   */
  adminListUsers(params: Prettify<operations['adminListUsers']['parameters']['path']> & Prettify<operations['adminListUsers']['parameters']['query']>) {
    return this._exec<operations['adminListUsers']>('adminListUsers', params) as unknown as Promise<Prettify<operations['adminListUsers']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Get a list of user actions
   */
  listUserActions(params: Prettify<operations['listUserActions']['parameters']['query']>) {
    return this._exec<operations['listUserActions']>('listUserActions', params) as unknown as Promise<Prettify<operations['listUserActions']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Send password reset email
   */
  sendPasswordResetEmail() {
    return this._exec<operations['sendPasswordResetEmail']>('sendPasswordResetEmail') as unknown as Promise<Prettify<operations['sendPasswordResetEmail']['responses']['200']['content']['application/json']>> ;
  }

  /**
   * Change password
   */
  changePassword(params: Prettify<operations['changePassword']['parameters']['path']>) {
    return this._exec<operations['changePassword']>('changePassword', params);
  }

  /**
   * Get email addresses belonging to a user
   */
  getUserEmails(params: Prettify<operations['getUserEmails']['parameters']['path']>) {
    return this._exec<operations['getUserEmails']>('getUserEmails', params) as unknown as Promise<Prettify<operations['getUserEmails']['responses']['200']['content']['application/json']>> ;
  }

}