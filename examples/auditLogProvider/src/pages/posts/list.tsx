import { useTable, useNavigation, useModal } from "@pankod/refine-core";
import { useState } from "react";

import { Modal } from "../../components/modal";
import { History } from "../../components/history";
import { IPost } from "../../interfaces";

export const PostList: React.FC = () => {
    const { show, close, visible } = useModal();
    const [historyId, setHistoryId] = useState<number>();
    const { tableQueryResult } = useTable<IPost>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });
    const { edit, create } = useNavigation();

    return (
        <div>
            <button onClick={() => create("posts")}>Create Post</button>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Title</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {tableQueryResult.data?.data.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>
                                <button onClick={() => edit("posts", post.id)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setHistoryId(post.id);
                                        show();
                                    }}
                                >
                                    History
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={visible} onClose={close}>
                <History resource="posts" id={historyId} />
            </Modal>
        </div>
    );
};
