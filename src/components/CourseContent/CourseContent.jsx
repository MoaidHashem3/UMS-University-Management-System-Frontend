import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import PdfViewer from '../Content/PdfViewer';
import Quiz from '../Quiz/QuizBox';
import axiosInstance from '../../axiosConfig';
const CourseContent = ({ courseId: propCourseId }) => {
  const { courseId: paramCourseId } = useParams(); 
  const courseId = propCourseId || paramCourseId; 

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfTitle, setPdfTitle] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState(null); 
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${courseId}`);
        console.log(response.data.imageUrl)
        const normalizedImageUrl = response.data.imageUrl.replace(/\\/g, "/");
        setCourse({ ...response.data, imageUrl: normalizedImageUrl });
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!course) {
    return <Typography variant="h6">No course found.</Typography>;
  }

  const { content, quizzes } = course;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'top',
        bgcolor: 'secondary.main',
        height: '100vh',
      }}
    >
      {/* PDF Viewer Section */}
      {pdfUrl ? (
        <Box sx={{ width: '100%', position: 'relative' }}>
          <PdfViewer fileUrl={pdfUrl} title={pdfTitle} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setPdfUrl(null);
              setPdfTitle('');
            }}
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '200px',
              marginBottom: '20px',
            }}
          >
            Back
          </Button>
        </Box>
      ) : selectedQuizId ? (
        // Quiz Section
        <Box sx={{ width: '100%', position: 'relative' }}>
          <Quiz quizId={selectedQuizId} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedQuizId(null);
            }}
            sx={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '200px',
              marginBottom: '20px',
            }}
          >
            Back
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              backgroundImage: `url(${course.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0 50% 7% 0',
              width: { xs: '100%', md: '50%' },
              height: '100vh',
              marginLeft: { xs: 0, md: '0' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" color="white" sx={{ fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
              {course.title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: { xs: '100%', md: '50%' },
              paddingLeft: { xs: 0, md: '20px' },
            }}
          >
            {!showContent && !showQuizzes && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowContent(true);
                    setShowQuizzes(false);
                    setSelectedQuizId(null); 
                  }}
                  sx={{ width: '250px', height: '60px', borderRadius: '50px' }}
                >
                  Content
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowQuizzes(true);
                    setShowContent(false);
                    setSelectedQuizId(null); 
                  }}
                  sx={{ width: '250px', height: '60px', borderRadius: '50px' }}
                >
                  Quizzes
                </Button>
              </Box>
            )}

            {(showContent || showQuizzes) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowContent(false);
                  setShowQuizzes(false);
                  setPdfUrl(null);
                  setPdfTitle('');
                  setSelectedQuizId(null);
                }}
                sx={{ width: '200px', marginBottom: '20px' }}
              >
                Back
              </Button>
            )}

            <Box sx={{ color: 'white' }}>
              {showContent && (
                <>
                  <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>Course Content</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    {content.length > 0 ? (
                      content.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: 'secondary.light',
                            padding: '10px',
                            borderRadius: '8px',
                            width: '98%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="h6" color="white">
                            {item.title}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setPdfUrl(item.filePath);
                              setPdfTitle(item.title);
                            }}
                          >
                            View
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="h6">No content available for this course.</Typography>
                    )}
                  </Box>
                </>
              )}

              {showQuizzes && selectedQuizId === null && (
                <>
                  <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>Course Quizzes</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px',
                    }}
                  >
                    {quizzes.length > 0 ? (
                      quizzes.map((quiz, index) => (
                        <Box
                          key={index}
                          sx={{
                            backgroundColor: 'secondary.light',
                            padding: '10px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '98%',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="h6" color="white">
                            {quiz.title}
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setSelectedQuizId(quiz._id)} 
                          >
                            Start
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="h6">No quizzes available for this course.</Typography>
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CourseContent;
