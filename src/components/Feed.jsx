import Thread from "./Thread";

const Feed = ({
  user,
  filteredThreads,
  setOpenPopUp,
  getThreads,
  setInteractingThread,
}) => {
  return (
    <div className="feed">
      {filteredThreads?.map((filteredThread) => (
        <Thread
          key={filteredThread.id}
          setOpenPopUp={setOpenPopUp}
          user={user}
          getThreads={getThreads}
          setInteractingThread={setInteractingThread}
          filteredThread={filteredThread}
        />
      ))}
    </div>
  );
};

export default Feed;
