import { FaUsers } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { getTotalUser } from "../../services/user/user";
import { useQuery } from "@tanstack/react-query";
import { totalLiveQuiz } from "../../services/liveQuiz/liveQuiz";
import { totalCategoryQuiz } from "../../services/category/category";
import { questionCount } from "../../services/question/question";

const DashboardStatistic = () => {
  const { data: { data: totalUsers } = { data: null } } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: getTotalUser,
  });

  const { data: { data: totalLiveQuizCount } = { data: null } } = useQuery({
    queryKey: ["totalLiveQuiz"],
    queryFn: totalLiveQuiz,
  });

  const { data: { data: totalCategoryQuizCount } = { data: null } } = useQuery({
    queryKey: ["totalCategoryQuiz"],
    queryFn: totalCategoryQuiz,
  });

  const { data: { data: questionCountData } = { data: null } } = useQuery({
    queryKey: ["questionCount"],
    queryFn: questionCount,
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col justify-center items-center md:flex-row gap-1 sm:gap-4 w-full rounded-lg bg-[#1A393E] px-6 py-2 sm:py-5">
          {/* <FaUsers className="bg-gray-500 rounded-full h-10 sm:h-20 w-10 sm:w-20 text-white p-2 sm:p-5" /> */}
          <div>
            <p className="sm:text-2xl md:text-3xl font-medium text-lime-500 mb-2 text-center  ">
              {totalUsers - 1}
            </p>
            <p className="sm:text-xl md:text-2xl   ">Total User</p>
          </div>
        </div>

        <div className="flex flex-col justify-center md:flex-row gap-1 sm:gap-4 w-full rounded-lg bg-[#1A393E] sm:px-6 py-2 sm:py-5 items-center">
          {/* <AiFillEdit className="bg-gray-500 rounded-full h-10 sm:h-20 w-10 sm:w-20 text-white p-2 sm:p-5" /> */}
          <div>
            <p className="sm:text-2xl md:text-3xl font-medium text-lime-500 mb-2 text-center">
              {totalCategoryQuizCount}
            </p>
            <p className="sm:text-xl md:text-2xl ">Category Quiz</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:flex-row gap-1 sm:gap-4 w-full rounded-lg bg-[#1A393E] sm:px-6 py-2 sm:py-5  ">
          {/* <RiQuestionAnswerFill className="bg-gray-500 rounded-full h-10 sm:h-20 w-10 sm:w-20 text-white p-2 sm:p-5" /> */}
          <div>
            <p className="sm:text-2xl md:text-3xl font-medium text-lime-500 mb-2 text-center">
              {questionCountData?.levelCount}
            </p>
            <p className="sm:text-xl md:text-2xl ">Toal Category Question</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-2">
        <div className="flex flex-col md:flex-row gap-1 sm:gap-4 w-full rounded-lg bg-[#1A393E] sm:px-6 py-2 sm:py-5 items-center justify-center">
          {/* <MdQuiz className="bg-gray-500 rounded-full h-10 sm:h-20 w-10 sm:w-20 text-white p-2 sm:p-5" /> */}
          <div>
            <p className="sm:text-2xl md:text-3xl font-medium   text-center text-lime-500 mb-2">
              {totalLiveQuizCount}
            </p>
            <p className="sm:text-xl md:text-2xl ">Live Quiz </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:flex-row gap-1 sm:gap-4 w-full rounded-lg bg-[#1A393E] px-6 py-2 sm:py-5">
          {/* <RiQuestionAnswerFill className="bg-gray-500 rounded-full h-10 sm:h-20 w-10 sm:w-20 text-white p-2 sm:p-5" /> */}
          <div>
            <p className="sm:text-2xl md:text-3xl font-medium text-lime-500 mb-2 text-center">
              {questionCountData?.scheduleCount}
            </p>
            <p className="sm:text-xl md:text-2xl ">Total Live Question</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistic;
