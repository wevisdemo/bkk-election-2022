import { useContext } from 'react';
import { ExclusiveQuestion } from '../../components/badge/exclusiveQuestion';
import { AppContext } from '../../store';
import playButtonGray from '../../static/icons/play-gray.svg';
import Image from 'next/image';

export default function QuestionStandard() {
  const { store } = useContext(AppContext);
  const qaList = store.qaList;
  const questionCategory = store.questionCategory;
}
