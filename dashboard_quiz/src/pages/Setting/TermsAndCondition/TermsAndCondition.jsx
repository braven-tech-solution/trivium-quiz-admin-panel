import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSetting from "../../../hooks/useSetting";

const TermsAndCondition = () => {
  const termsAndConditonText = `
    <p>Quiz  Website. Terms And Condition</p> 
    `;

  const editor = useRef(null);
  const [content, setContent] = useState(termsAndConditonText);
  const navigate = useNavigate();

  const { termsOfService, settingUpdate } = useSetting();

  console.log(termsOfService);

  useEffect(() => {
    if (termsOfService) [setContent(termsOfService)];
  }, [termsOfService]);

  const handleOnSave = () => {
    // console.log(content);

    settingUpdate({
      termsOfService: content,
    });
  };

  return (
    <div className="min-h-screen py-2 px-2 rounded-lg">
      <div className="flex items-center gap-2 text-2xl font-bold p-2   bg-[#013564] text-[#E1E1E1] rounded-lg">
        <p className="cursor-pointer" onClick={() => navigate(-1)}>
          <LeftOutlined />
        </p>
        <p>Terms And Condition</p>
      </div>
      <div className="mt-5 text-black">
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            height: 350,
            theme: "light",
            readonly: false,
          }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <Button
        block
        onClick={handleOnSave}
        style={{
          marginTop: "16px",
          padding: "1px",
          fontSize: "24px",
          color: "white",
          background: "#013564",
          height: "55px",
          border: "none",
        }}
      >
        Save
      </Button>
    </div>
  );
};
export default TermsAndCondition;
