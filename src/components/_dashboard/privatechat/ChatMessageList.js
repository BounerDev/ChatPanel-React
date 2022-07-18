import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../Scrollbar';
import LightboxModal from '../../LightboxModal';
import ChatMessageItem from './ChatMessageItem';
import { serverConfig } from '../../../config';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired
};

export default function ChatMessageList({ conversation }) {
  const scrollRef = useRef();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const images = conversation.messages
    .filter((messages) => messages.imgs.length > 0)
    .map((messages) => messages.imgs)
    .join()
    .split(',')
    .map((img) => `${serverConfig.baseUrl}/message/img-src/${img}`);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(images, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, flexGrow: 1 }}>
      {conversation.messages.map((message) => (
        <ChatMessageItem
          key={message._id}
          message={message}
          conversation={conversation}
          onOpenLightbox={handleOpenLightbox}
        />
      ))}

      <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </Scrollbar>
  );
}
