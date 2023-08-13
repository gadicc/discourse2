import { operations } from "./schema";

export default class DiscourseAPIGenerated {
  _exec<T>(operationName: string, params?: any) { throw new Error('Not implemented'); }

  /**
   * List backups
   */
  getBackups(): Promise<operations['getBackups']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getBackups']>('getBackups') as unknown as Promise<operations['getBackups']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Create backup
   */
  createBackup(): Promise<operations['createBackup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createBackup']>('createBackup') as unknown as Promise<operations['createBackup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Send download backup email
   */
  sendDownloadBackupEmail(params?: operations['sendDownloadBackupEmail']['parameters']['path']){
    return this._exec<operations['sendDownloadBackupEmail']>('sendDownloadBackupEmail', params);
  }

  /**
   * Download backup
   */
  downloadBackup(params?: operations['downloadBackup']['parameters']['path']){
    return this._exec<operations['downloadBackup']>('downloadBackup', params);
  }

  /**
   * List badges
   */
  adminListBadges(): Promise<operations['adminListBadges']['responses']['200']['content']['application/json']> {
    return this._exec<operations['adminListBadges']>('adminListBadges') as unknown as Promise<operations['adminListBadges']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Create badge
   */
  createBadge(): Promise<operations['createBadge']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createBadge']>('createBadge') as unknown as Promise<operations['createBadge']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update badge
   */
  updateBadge(params?: operations['updateBadge']['parameters']['path']): Promise<operations['updateBadge']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateBadge']>('updateBadge', params) as unknown as Promise<operations['updateBadge']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Delete badge
   */
  deleteBadge(params?: operations['deleteBadge']['parameters']['path']){
    return this._exec<operations['deleteBadge']>('deleteBadge', params);
  }

  /**
   * Creates a category
   */
  createCategory(): Promise<operations['createCategory']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createCategory']>('createCategory') as unknown as Promise<operations['createCategory']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Retrieves a list of categories
   */
  listCategories(params: operations['listCategories']['parameters']['query']): Promise<operations['listCategories']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listCategories']>('listCategories', params) as unknown as Promise<operations['listCategories']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Updates a category
   */
  updateCategory(params?: operations['updateCategory']['parameters']['path']): Promise<operations['updateCategory']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateCategory']>('updateCategory', params) as unknown as Promise<operations['updateCategory']['responses']['200']['content']['application/json']> ;
  }

  /**
   * List topics
   */
  listCategoryTopics(params?: operations['listCategoryTopics']['parameters']['path']): Promise<operations['listCategoryTopics']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listCategoryTopics']>('listCategoryTopics', params) as unknown as Promise<operations['listCategoryTopics']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Show category
   */
  getCategory(params?: operations['getCategory']['parameters']['path']): Promise<operations['getCategory']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getCategory']>('getCategory', params) as unknown as Promise<operations['getCategory']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Create a group
   */
  createGroup(): Promise<operations['createGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createGroup']>('createGroup') as unknown as Promise<operations['createGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Delete a group
   */
  deleteGroup(params?: operations['deleteGroup']['parameters']['path']): Promise<operations['deleteGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['deleteGroup']>('deleteGroup', params) as unknown as Promise<operations['deleteGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update a group
   */
  updateGroup(params?: operations['updateGroup']['parameters']['path']): Promise<operations['updateGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateGroup']>('updateGroup', params) as unknown as Promise<operations['updateGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a group
   */
  getGroup(params?: operations['getGroup']['parameters']['path']): Promise<operations['getGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getGroup']>('getGroup', params) as unknown as Promise<operations['getGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * List group members
   */
  listGroupMembers(params?: operations['listGroupMembers']['parameters']['path']): Promise<operations['listGroupMembers']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listGroupMembers']>('listGroupMembers', params) as unknown as Promise<operations['listGroupMembers']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Add group members
   */
  addGroupMembers(params?: operations['addGroupMembers']['parameters']['path']): Promise<operations['addGroupMembers']['responses']['200']['content']['application/json']> {
    return this._exec<operations['addGroupMembers']>('addGroupMembers', params) as unknown as Promise<operations['addGroupMembers']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Remove group members
   */
  removeGroupMembers(params?: operations['removeGroupMembers']['parameters']['path']): Promise<operations['removeGroupMembers']['responses']['200']['content']['application/json']> {
    return this._exec<operations['removeGroupMembers']>('removeGroupMembers', params) as unknown as Promise<operations['removeGroupMembers']['responses']['200']['content']['application/json']> ;
  }

  /**
   * List groups
   */
  listGroups(): Promise<operations['listGroups']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listGroups']>('listGroups') as unknown as Promise<operations['listGroups']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Create an invite
   */
  createInvite(): Promise<operations['createInvite']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createInvite']>('createInvite') as unknown as Promise<operations['createInvite']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get the notifications that belong to the current user
   */
  getNotifications(): Promise<operations['getNotifications']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getNotifications']>('getNotifications') as unknown as Promise<operations['getNotifications']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Mark notifications as read
   */
  markNotificationsAsRead(): Promise<operations['markNotificationsAsRead']['responses']['200']['content']['application/json']> {
    return this._exec<operations['markNotificationsAsRead']>('markNotificationsAsRead') as unknown as Promise<operations['markNotificationsAsRead']['responses']['200']['content']['application/json']> ;
  }

  /**
   * List latest posts across topics
   */
  listPosts(params?: operations['listPosts']['parameters']['query']): Promise<operations['listPosts']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listPosts']>('listPosts', params) as unknown as Promise<operations['listPosts']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Creates a new topic, a new post, or a private message
   */
  createTopicPostPM(): Promise<operations['createTopicPostPM']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createTopicPostPM']>('createTopicPostPM') as unknown as Promise<operations['createTopicPostPM']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Retrieve a single post
   */
  getPost(params?: operations['getPost']['parameters']['path']): Promise<operations['getPost']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getPost']>('getPost', params) as unknown as Promise<operations['getPost']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update a single post
   */
  updatePost(params?: operations['updatePost']['parameters']['path']): Promise<operations['updatePost']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updatePost']>('updatePost', params) as unknown as Promise<operations['updatePost']['responses']['200']['content']['application/json']> ;
  }

  /**
   * delete a single post
   */
  deletePost(params?: operations['deletePost']['parameters']['path']){
    return this._exec<operations['deletePost']>('deletePost', params);
  }

  /**
   * List replies to a post
   */
  postReplies(params?: operations['postReplies']['parameters']['path']): Promise<operations['postReplies']['responses']['200']['content']['application/json']> {
    return this._exec<operations['postReplies']>('postReplies', params) as unknown as Promise<operations['postReplies']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Lock a post from being edited
   */
  lockPost(params?: operations['lockPost']['parameters']['path']): Promise<operations['lockPost']['responses']['200']['content']['application/json']> {
    return this._exec<operations['lockPost']>('lockPost', params) as unknown as Promise<operations['lockPost']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Like a post and other actions
   */
  performPostAction(): Promise<operations['performPostAction']['responses']['200']['content']['application/json']> {
    return this._exec<operations['performPostAction']>('performPostAction') as unknown as Promise<operations['performPostAction']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a list of private messages for a user
   */
  listUserPrivateMessages(params?: operations['listUserPrivateMessages']['parameters']['path']): Promise<operations['listUserPrivateMessages']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listUserPrivateMessages']>('listUserPrivateMessages', params) as unknown as Promise<operations['listUserPrivateMessages']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a list of private messages sent for a user
   */
  getUserSentPrivateMessages(params?: operations['getUserSentPrivateMessages']['parameters']['path']): Promise<operations['getUserSentPrivateMessages']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getUserSentPrivateMessages']>('getUserSentPrivateMessages', params) as unknown as Promise<operations['getUserSentPrivateMessages']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Search for a term
   */
  search(params: operations['search']['parameters']['query']): Promise<operations['search']['responses']['200']['content']['application/json']> {
    return this._exec<operations['search']>('search', params) as unknown as Promise<operations['search']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get site info
   */
  getSite(): Promise<operations['getSite']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getSite']>('getSite') as unknown as Promise<operations['getSite']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a list of tag groups
   */
  listTagGroups(): Promise<operations['listTagGroups']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listTagGroups']>('listTagGroups') as unknown as Promise<operations['listTagGroups']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Creates a tag group
   */
  createTagGroup(): Promise<operations['createTagGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createTagGroup']>('createTagGroup') as unknown as Promise<operations['createTagGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a single tag group
   */
  getTagGroup(params?: operations['getTagGroup']['parameters']['path']): Promise<operations['getTagGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getTagGroup']>('getTagGroup', params) as unknown as Promise<operations['getTagGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update tag group
   */
  updateTagGroup(params?: operations['updateTagGroup']['parameters']['path']): Promise<operations['updateTagGroup']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateTagGroup']>('updateTagGroup', params) as unknown as Promise<operations['updateTagGroup']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a list of tags
   */
  listTags(): Promise<operations['listTags']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listTags']>('listTags') as unknown as Promise<operations['listTags']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a specific tag
   */
  getTag(params?: operations['getTag']['parameters']['path']): Promise<operations['getTag']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getTag']>('getTag', params) as unknown as Promise<operations['getTag']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get specific posts from a topic
   */
  getSpecificPostsFromTopic(params?: operations['getSpecificPostsFromTopic']['parameters']['path']): Promise<operations['getSpecificPostsFromTopic']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getSpecificPostsFromTopic']>('getSpecificPostsFromTopic', params) as unknown as Promise<operations['getSpecificPostsFromTopic']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a single topic
   */
  getTopic(params?: operations['getTopic']['parameters']['path']): Promise<operations['getTopic']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getTopic']>('getTopic', params) as unknown as Promise<operations['getTopic']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Remove a topic
   */
  removeTopic(params?: operations['removeTopic']['parameters']['path']){
    return this._exec<operations['removeTopic']>('removeTopic', params);
  }

  /**
   * Update a topic
   */
  updateTopic(params?: operations['updateTopic']['parameters']['path']): Promise<operations['updateTopic']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateTopic']>('updateTopic', params) as unknown as Promise<operations['updateTopic']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Invite to topic
   */
  inviteToTopic(params?: operations['inviteToTopic']['parameters']['path']): Promise<operations['inviteToTopic']['responses']['200']['content']['application/json']> {
    return this._exec<operations['inviteToTopic']>('inviteToTopic', params) as unknown as Promise<operations['inviteToTopic']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Bookmark topic
   */
  bookmarkTopic(params?: operations['bookmarkTopic']['parameters']['path']){
    return this._exec<operations['bookmarkTopic']>('bookmarkTopic', params);
  }

  /**
   * Update the status of a topic
   */
  updateTopicStatus(params?: operations['updateTopicStatus']['parameters']['path']): Promise<operations['updateTopicStatus']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateTopicStatus']>('updateTopicStatus', params) as unknown as Promise<operations['updateTopicStatus']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get the latest topics
   */
  listLatestTopics(params?: operations['listLatestTopics']['parameters']['query']): Promise<operations['listLatestTopics']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listLatestTopics']>('listLatestTopics', params) as unknown as Promise<operations['listLatestTopics']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get the top topics filtered by period
   */
  listTopTopics(params?: operations['listTopTopics']['parameters']['query']): Promise<operations['listTopTopics']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listTopTopics']>('listTopTopics', params) as unknown as Promise<operations['listTopTopics']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Set notification level
   */
  setNotificationLevel(params?: operations['setNotificationLevel']['parameters']['path']): Promise<operations['setNotificationLevel']['responses']['200']['content']['application/json']> {
    return this._exec<operations['setNotificationLevel']>('setNotificationLevel', params) as unknown as Promise<operations['setNotificationLevel']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update topic timestamp
   */
  updateTopicTimestamp(params?: operations['updateTopicTimestamp']['parameters']['path']): Promise<operations['updateTopicTimestamp']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateTopicTimestamp']>('updateTopicTimestamp', params) as unknown as Promise<operations['updateTopicTimestamp']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Create topic timer
   */
  createTopicTimer(params?: operations['createTopicTimer']['parameters']['path']): Promise<operations['createTopicTimer']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createTopicTimer']>('createTopicTimer', params) as unknown as Promise<operations['createTopicTimer']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get topic by external_id
   */
  getTopicByExternalId(params?: operations['getTopicByExternalId']['parameters']['path']){
    return this._exec<operations['getTopicByExternalId']>('getTopicByExternalId', params);
  }

  /**
   * Creates an upload
   */
  createUpload(): Promise<operations['createUpload']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createUpload']>('createUpload') as unknown as Promise<operations['createUpload']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Initiates a direct external upload
   */
  generatePresignedPut(): Promise<operations['generatePresignedPut']['responses']['200']['content']['application/json']> {
    return this._exec<operations['generatePresignedPut']>('generatePresignedPut') as unknown as Promise<operations['generatePresignedPut']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Completes a direct external upload
   */
  completeExternalUpload(): Promise<operations['completeExternalUpload']['responses']['200']['content']['application/json']> {
    return this._exec<operations['completeExternalUpload']>('completeExternalUpload') as unknown as Promise<operations['completeExternalUpload']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Creates a multipart external upload
   */
  createMultipartUpload(): Promise<operations['createMultipartUpload']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createMultipartUpload']>('createMultipartUpload') as unknown as Promise<operations['createMultipartUpload']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Generates batches of presigned URLs for multipart parts
   */
  batchPresignMultipartParts(): Promise<operations['batchPresignMultipartParts']['responses']['200']['content']['application/json']> {
    return this._exec<operations['batchPresignMultipartParts']>('batchPresignMultipartParts') as unknown as Promise<operations['batchPresignMultipartParts']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Abort multipart upload
   */
  abortMultipart(): Promise<operations['abortMultipart']['responses']['200']['content']['application/json']> {
    return this._exec<operations['abortMultipart']>('abortMultipart') as unknown as Promise<operations['abortMultipart']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Complete multipart upload
   */
  completeMultipart(): Promise<operations['completeMultipart']['responses']['200']['content']['application/json']> {
    return this._exec<operations['completeMultipart']>('completeMultipart') as unknown as Promise<operations['completeMultipart']['responses']['200']['content']['application/json']> ;
  }

  /**
   * List badges for a user
   */
  listUserBadges(params?: operations['listUserBadges']['parameters']['path']): Promise<operations['listUserBadges']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listUserBadges']>('listUserBadges', params) as unknown as Promise<operations['listUserBadges']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Creates a user
   */
  createUser(): Promise<operations['createUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['createUser']>('createUser') as unknown as Promise<operations['createUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a single user by username
   */
  getUser(params?: operations['getUser']['parameters']['path']): Promise<operations['getUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getUser']>('getUser', params) as unknown as Promise<operations['getUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update a user
   */
  updateUser(params?: operations['updateUser']['parameters']['path']): Promise<operations['updateUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateUser']>('updateUser', params) as unknown as Promise<operations['updateUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a user by external_id
   */
  getUserExternalId(params?: operations['getUserExternalId']['parameters']['path']): Promise<operations['getUserExternalId']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getUserExternalId']>('getUserExternalId', params) as unknown as Promise<operations['getUserExternalId']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a user by identity provider external ID
   */
  getUserIdentiyProviderExternalId(params?: operations['getUserIdentiyProviderExternalId']['parameters']['path']): Promise<operations['getUserIdentiyProviderExternalId']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getUserIdentiyProviderExternalId']>('getUserIdentiyProviderExternalId', params) as unknown as Promise<operations['getUserIdentiyProviderExternalId']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update avatar
   */
  updateAvatar(params?: operations['updateAvatar']['parameters']['path']): Promise<operations['updateAvatar']['responses']['200']['content']['application/json']> {
    return this._exec<operations['updateAvatar']>('updateAvatar', params) as unknown as Promise<operations['updateAvatar']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Update email
   */
  updateEmail(params?: operations['updateEmail']['parameters']['path']){
    return this._exec<operations['updateEmail']>('updateEmail', params);
  }

  /**
   * Update username
   */
  updateUsername(params?: operations['updateUsername']['parameters']['path']){
    return this._exec<operations['updateUsername']>('updateUsername', params);
  }

  /**
   * Get a public list of users
   */
  listUsersPublic(params?: operations['listUsersPublic']['parameters']['query']): Promise<operations['listUsersPublic']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listUsersPublic']>('listUsersPublic', params) as unknown as Promise<operations['listUsersPublic']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a user by id
   */
  adminGetUser(params?: operations['adminGetUser']['parameters']['path']): Promise<operations['adminGetUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['adminGetUser']>('adminGetUser', params) as unknown as Promise<operations['adminGetUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Delete a user
   */
  deleteUser(params?: operations['deleteUser']['parameters']['path']): Promise<operations['deleteUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['deleteUser']>('deleteUser', params) as unknown as Promise<operations['deleteUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Activate a user
   */
  activateUser(params?: operations['activateUser']['parameters']['path']): Promise<operations['activateUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['activateUser']>('activateUser', params) as unknown as Promise<operations['activateUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Deactivate a user
   */
  deactivateUser(params?: operations['deactivateUser']['parameters']['path']): Promise<operations['deactivateUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['deactivateUser']>('deactivateUser', params) as unknown as Promise<operations['deactivateUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Suspend a user
   */
  suspendUser(params?: operations['suspendUser']['parameters']['path']): Promise<operations['suspendUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['suspendUser']>('suspendUser', params) as unknown as Promise<operations['suspendUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Silence a user
   */
  silenceUser(params?: operations['silenceUser']['parameters']['path']): Promise<operations['silenceUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['silenceUser']>('silenceUser', params) as unknown as Promise<operations['silenceUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Anonymize a user
   */
  anonymizeUser(params?: operations['anonymizeUser']['parameters']['path']): Promise<operations['anonymizeUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['anonymizeUser']>('anonymizeUser', params) as unknown as Promise<operations['anonymizeUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Log a user out
   */
  logOutUser(params?: operations['logOutUser']['parameters']['path']): Promise<operations['logOutUser']['responses']['200']['content']['application/json']> {
    return this._exec<operations['logOutUser']>('logOutUser', params) as unknown as Promise<operations['logOutUser']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Refresh gravatar
   */
  refreshGravatar(params?: operations['refreshGravatar']['parameters']['path']): Promise<operations['refreshGravatar']['responses']['200']['content']['application/json']> {
    return this._exec<operations['refreshGravatar']>('refreshGravatar', params) as unknown as Promise<operations['refreshGravatar']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a list of users
   */
  adminListUsers(params?: operations['adminListUsers']['parameters']['path']): Promise<operations['adminListUsers']['responses']['200']['content']['application/json']> {
    return this._exec<operations['adminListUsers']>('adminListUsers', params) as unknown as Promise<operations['adminListUsers']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Get a list of user actions
   */
  listUserActions(params?: operations['listUserActions']['parameters']['query']): Promise<operations['listUserActions']['responses']['200']['content']['application/json']> {
    return this._exec<operations['listUserActions']>('listUserActions', params) as unknown as Promise<operations['listUserActions']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Send password reset email
   */
  sendPasswordResetEmail(): Promise<operations['sendPasswordResetEmail']['responses']['200']['content']['application/json']> {
    return this._exec<operations['sendPasswordResetEmail']>('sendPasswordResetEmail') as unknown as Promise<operations['sendPasswordResetEmail']['responses']['200']['content']['application/json']> ;
  }

  /**
   * Change password
   */
  changePassword(params?: operations['changePassword']['parameters']['path']){
    return this._exec<operations['changePassword']>('changePassword', params);
  }

  /**
   * Get email addresses belonging to a user
   */
  getUserEmails(params?: operations['getUserEmails']['parameters']['path']): Promise<operations['getUserEmails']['responses']['200']['content']['application/json']> {
    return this._exec<operations['getUserEmails']>('getUserEmails', params) as unknown as Promise<operations['getUserEmails']['responses']['200']['content']['application/json']> ;
  }

}
