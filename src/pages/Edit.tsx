import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownToHTML from '@/components/MarkdownToHTML';
import SkeletonLoading from '@/components/Wiki/SkeletonLoading';
import EditTitle from '@/components/Edit/EditTitle';
import ImageUploadButton from '@/components/Edit/ImageUploadButton';
import SaveButton from '@/components/Edit/SaveButton';
import BackButton from '@/components/Edit/BackButton';
import useWikiQuery from '@/apis/queries/useWikiQuery';
import useWikiMutation from '@/apis/mutations/useWikiMutation';
import { MAIN_PAGE_URL } from '@/constants/common';

export default function Edit() {
  const { pageTitle } = useParams();
  const navigate = useNavigate();

  const { data: prevWikiData, isLoading } = useWikiQuery(`/wiki/${pageTitle}`);
  const { mutate: saveWiki, isPending: isSaving } = useWikiMutation();

  const [contents, setContents] = useState('');

  // TODO: preview 컴포넌트 ref 연결로 스크롤 동기화

  useEffect(() => {
    if (prevWikiData) {
      if (prevWikiData.result.status === 'PROTECTED') navigate(MAIN_PAGE_URL);

      const prevContents = prevWikiData.result.contents;
      setContents(prevContents.slice(0, prevContents.length - 2));
    }
  }, [prevWikiData]);

  if (isLoading) return <SkeletonLoading />;

  const handleChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  // TODO: 로직 추가
  const onDropImage = () => {};

  // TODO: 로직 추가
  const handleUploadImage = () => {};

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const saveWikiData = {
      isEdit: !!prevWikiData,
      pageTitle: pageTitle as string,
      contents,
    };

    saveWiki(saveWikiData);
  };

  return (
    <section className="flex h-full gap-4 bg-white p-5 dark:bg-base-800">
      <div className="flex h-full w-1/2 flex-col mobile:w-full">
        <EditTitle>{`${pageTitle} ${prevWikiData ? '' : '(새 페이지 생성)'}`}</EditTitle>
        <div className="h-1 w-10 bg-base-700 dark:bg-base-600" />
        <form onSubmit={handleSave} className="flex h-full flex-col">
          <textarea
            onDrop={onDropImage}
            className="scroll-custom mb-1 mt-5 h-full resize-none bg-transparent pl-1 focus:outline-none dark:text-base-200"
            onChange={handleChangeContents}
            name="contents"
            placeholder="이곳에 내용을 입력하세요"
            ref={() => {}}
            onScroll={() => {}}
            value={contents}
          />
          <div className="flex items-center justify-end gap-2 border-t border-base-500 p-3 dark:border-base-600">
            <ImageUploadButton handleUploadImage={handleUploadImage} />
            <BackButton />
            <SaveButton disabled={isSaving} />
          </div>
        </form>
      </div>
      <div
        className="scroll-custom my-2 h-auto w-1/2 overflow-auto border-l border-base-500 pl-4 pr-4 mobile:hidden dark:border-base-600"
        ref={() => {}}
      >
        <EditTitle>{pageTitle}</EditTitle>
        <div>
          <MarkdownToHTML>{contents}</MarkdownToHTML>
        </div>
      </div>
    </section>
  );
}
