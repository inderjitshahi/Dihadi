import Footer from '@/components/Footer';
import Form from '@/components/Form';
import Header from '@/components/Header';
import React from 'react';

function newComplaint(props) {
    return (
        <div>
            <Header/>
            <Form update={false}/>
            <Footer/>
        </div>
    );
}

export default newComplaint;