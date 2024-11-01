import React from 'react';
import { motion } from "framer-motion";
import { Mobile, PC } from "../styles/Global_d"; 

const Loading = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Mobile>
                <img
                    id="loading"
                    src="/images/spinner.gif"
                    alt="loading spinner"
                    style={{ marginTop: "68%", width: "130px", marginLeft: "33%" }}
                />
            </Mobile>
            <PC>
                <div style={{ textAlign: "center" }}>
                    <img
                        id="loading"
                        src="/images/spinner.gif"
                        alt="loading spinner"
                        style={{ marginTop: "20%", width: "130px" }}
                    />
                </div>
            </PC>
        </motion.div>
    );
};

export default Loading;
