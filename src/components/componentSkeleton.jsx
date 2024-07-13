import { Skeleton } from "antd";

const ComponentSkeleton = () => {
  return (
    <div className="box_component_skeleton">
      <Skeleton
        active
        paragraph={{
          rows: 10,
        }}
      />
    </div>
  );
};
export default ComponentSkeleton;
