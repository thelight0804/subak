package subak.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CachingConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class RedisConfig implements CachingConfigurer {

        @Value("${spring.redis.host}")
        private String host;

        @Value("${spring.redis.port}")
        private int port;

        @Bean
        public LettuceConnectionFactory redisConnectionFactory() {
            return new LettuceConnectionFactory(host, port);
        }

        @Bean
        public RedisTemplate<String, Object> redisTemplate() {
            RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
            redisTemplate.setKeySerializer(new StringRedisSerializer());
            redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
            redisTemplate.setConnectionFactory(redisConnectionFactory());

            return redisTemplate;
        }

        @Bean
        public RedisCacheManager redisCacheManager(RedisConnectionFactory connectionFactory){
            RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                    .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                    .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

            Map<String, RedisCacheConfiguration> redisCacheConfigurationMap = new HashMap<>();
            redisCacheConfigurationMap.put("popular_menus", redisCacheConfiguration.entryTtl(Duration.ofHours(1)));

            return RedisCacheManager.RedisCacheManagerBuilder
                    .fromConnectionFactory(connectionFactory)
                    .cacheDefaults(redisCacheConfiguration)
                    .withInitialCacheConfigurations(redisCacheConfigurationMap)
                    .build();
        }
    }