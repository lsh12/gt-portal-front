export const base_prefix = '/gtapi';
//export const base_prefix = 'http://apipt.genesis.tech:8080/gtapi';

export const forum_topic_list = '/api/v1/topics';
export const forum_answer_list = '/api/v1/answers';
export const forum_topics_answer = '/api/v1/answers/topic'

export const forum_user_session = '/api/v1/users/session';
export const forum_spectator = '/api/v1/users/spectator';

export const forum_topics_qna_list = '/api/v1/topics/qna/list';
export const forum_topics_qna_detail = '/api/v1/topics/qna/detail';
export const forum_topics_qna_delete = '/api/v1/topics';

export const forum_topics_guide_list = '/api/v1/topics/guide/list';
export const forum_topics_guide_detail = '/api/v1/topics/guide/detail';
export const forum_topics_guide_edit = '/api/v1/topics/guide/edit';
export const forum_topics_guide_delete = '/api/v1/topics'

export const forum_topics_document_list = '/api/v1/topics/document/list';
export const forum_topics_document_detail = '/api/v1/topics/document/detail'
export const forum_topics_document_delete = '/api/v1/topics'

export const download_file_id = '/api/v1/files/downloadByFileId';
export const upload_file= '/api/v1/files/uploadFile';
export const upload_image_file= '/api/v1/files/uploadImageFile';
export const delete_attach_file = '/api/v1/files/deleteAttachFile';

export const forum_images = '/api/v1/files/images';

export const userSessionUrl = base_prefix + forum_user_session;
export const topicUrl = base_prefix + forum_topic_list;

export const answerUrl = base_prefix + forum_answer_list;
export const answerTopicUrl = base_prefix + forum_topics_answer;

export const qnaListUrl = base_prefix + forum_topics_qna_list;
export const qnaDetailUrl = base_prefix + forum_topics_qna_detail;
export const qnaDeleteUrl = base_prefix + forum_topics_qna_delete;

export const guideListUrl = base_prefix + forum_topics_guide_list;
export const guideDetailUrl = base_prefix + forum_topics_guide_detail;
export const guideEditUrl = base_prefix + forum_topics_guide_edit;
export const guideDeleteUrl = base_prefix + forum_topics_guide_delete;
export const spectatorUrl = base_prefix + forum_spectator;

export const documentListUrl = base_prefix + forum_topics_document_list;
export const documentDetailUrl = base_prefix + forum_topics_document_detail;
export const documentDeleteUrl = base_prefix + forum_topics_document_delete;

//export const downloadByFileIdUrl = base_prefix+download_file_id;
export const uploadImageFileIdUrl = base_prefix+upload_image_file;
export const deleteAttchFileUrl = base_prefix+delete_attach_file;
export const imagesUrl = base_prefix+forum_images;
